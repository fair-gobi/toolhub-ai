import { pipeline, env, type PipelineType } from '@xenova/transformers' // Imported PipelineType

env.allowLocalModels = false
env.useBrowserCache = true

class TitlePipeline {
  // Option A (Recommended): Type it explicitly using the exported PipelineType
  static task: PipelineType = 'text-generation' 
  
  // Option B (Alternative): Make it a literal read-only constant using "as const"
  // static task = 'text-generation' as const

  static model = 'Xenova/Qwen1.5-0.5B-Chat'
  static instance: any = null

  static async getInstance(progress_callback?: any) {
    if (this.instance === null) {
      this.instance = await pipeline(this.task, this.model, { 
        progress_callback, 
        dtype: 'q4' 
      } as any) // <-- Add "as any" right here
    }
    return this.instance
} 
}