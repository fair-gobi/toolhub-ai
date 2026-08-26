import { neon } from '@neondatabase/serverless';

let _sql: any = null;

function getRealSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.NEON_DATABASE_URL || '';
  if (!url) return null;
  if (!_sql) _sql = neon(url);
  return _sql;
}

// dummy sql that returns [] during build when no DB URL
const dummySql: any = async () => [];
dummySql.query = async () => [];

export const sql: any = new Proxy(dummySql, {
  apply(_target: any, _this: any, args: any[]) {
    const real = getRealSql();
    if (!real) {
      // during `next build` without env, return empty
      return [];
    }
    return real(...args);
  },
  get(_target: any, prop: any) {
    const real = getRealSql();
    if (!real) return dummySql[prop] || (() => []);
    return (real as any)[prop];
  }
});