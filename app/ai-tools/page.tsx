"use client"
import Link from "next/link"
import { useState } from "react"

type ToolCategory = 'original' | 'video' | 'image' | 'image-editing' | 'audio' | 'business' | 'productivity'
type CategoryKey = 'all' | ToolCategory
type Pricing = 'Free' | 'Freemium' | 'Paid'

interface Tool {
  slug: string
  name: string
  desc: string
  category: ToolCategory
  pricing: Pricing
  url: string
  rating: number
  isOriginal?: boolean
  affiliate?: boolean
}

const ORIGINAL_TOOLS: Tool[] = [
  { slug: "resume-builder", name: "AI Resume Builder", desc: "Create ATS resume in 30 sec", category: "original", pricing: "Free", url: "/ai-tools/resume-builder", rating: 4.9, isOriginal: true },
  { slug: "cover-letter", name: "AI Cover Letter", desc: "Job-winning cover letters", category: "original", pricing: "Free", url: "/ai-tools/cover-letter", rating: 4.8, isOriginal: true },
  { slug: "code-generator", name: "AI Code Generator", desc: "Generate code in any language", category: "original", pricing: "Free", url: "/ai-tools/code-generator", rating: 4.8, isOriginal: true },
  { slug: "bug-finder", name: "AI Bug Finder", desc: "Find & fix bugs instantly", category: "original", pricing: "Free", url: "/ai-tools/bug-finder", rating: 4.7, isOriginal: true },
  { slug: "image-generator", name: "AI Image Generator", desc: "Text to image — unlimited free", category: "original", pricing: "Free", url: "/ai-tools/image-generator", rating: 4.8, isOriginal: true },
  { slug: "video-generator", name: "AI Video Generator", desc: "Text to video — 100% free", category: "original", pricing: "Free", url: "/ai-tools/video-generator", rating: 4.7, isOriginal: true },
]

const EXTERNAL_TOOLS: Tool[] = [
  { slug: "runway", name: "Runway ML", desc: "Turn text into cinematic videos Gen-3", category: "video", pricing: "Freemium", url: "https://runwayml.com", rating: 4.8, affiliate: true },
  { slug: "pika", name: "Pika Labs", desc: "AI video from text and image", category: "video", pricing: "Free", url: "https://pika.art", rating: 4.7 },
  { slug: "sora", name: "Sora by OpenAI", desc: "Text-to-video realistic 60s scenes", category: "video", pricing: "Paid", url: "https://openai.com/sora", rating: 4.9 },
  { slug: "kling", name: "Kling AI", desc: "High-fidelity video for YouTube", category: "video", pricing: "Freemium", url: "https://kling.kuaishou.com", rating: 4.7 },
  { slug: "luma", name: "Luma Dream Machine", desc: "Realistic video from text", category: "video", pricing: "Freemium", url: "https://lumalabs.ai", rating: 4.8 },
  { slug: "heygen", name: "HeyGen", desc: "AI avatar video generator", category: "video", pricing: "Freemium", url: "https://www.heygen.com", rating: 4.6, affiliate: true },
  { slug: "synthesia", name: "Synthesia", desc: "AI videos with 160+ avatars", category: "video", pricing: "Paid", url: "https://www.synthesia.io", rating: 4.7, affiliate: true },
  { slug: "invideo", name: "InVideo AI", desc: "Text to full video with voiceover", category: "video", pricing: "Freemium", url: "https://invideo.io", rating: 4.6, affiliate: true },
  { slug: "capcut-ai", name: "CapCut AI Video", desc: "Free AI video with auto captions", category: "video", pricing: "Free", url: "https://www.capcut.com/tools/ai-video-maker", rating: 4.7 },
  { slug: "vidu", name: "Vidu AI", desc: "Long consistent AI videos", category: "video", pricing: "Freemium", url: "https://www.vidu.studio", rating: 4.6 },
  { slug: "pictory", name: "Pictory", desc: "Script to video with AI voices", category: "video", pricing: "Paid", url: "https://pictory.ai", rating: 4.5, affiliate: true },
  { slug: "descript", name: "Descript", desc: "Edit video like a doc", category: "video", pricing: "Freemium", url: "https://www.descript.com", rating: 4.7 },
  { slug: "opusclip", name: "OpusClip", desc: "Long to viral shorts with AI", category: "video", pricing: "Freemium", url: "https://www.opus.pro", rating: 4.8 },
  { slug: "veed", name: "VEED.IO", desc: "AI editor, subtitles & translations", category: "video", pricing: "Freemium", url: "https://www.veed.io", rating: 4.6 },
  { slug: "elai", name: "Elai.io", desc: "Text-to-video with avatars", category: "video", pricing: "Paid", url: "https://elai.io", rating: 4.5 },
  { slug: "colossyan", name: "Colossyan", desc: "AI video for learning", category: "video", pricing: "Paid", url: "https://www.colossyan.com", rating: 4.5 },
  { slug: "d-id", name: "D-ID", desc: "Animate photo to talking video", category: "video", pricing: "Freemium", url: "https://www.d-id.com", rating: 4.6 },
  { slug: "fliki", name: "Fliki", desc: "Blog to video 75 languages", category: "video", pricing: "Freemium", url: "https://fliki.ai", rating: 4.6 },
  { slug: "vidnoz", name: "Vidnoz AI", desc: "Free 1200+ avatars video", category: "video", pricing: "Free", url: "https://www.vidnoz.com", rating: 4.5 },
  { slug: "visla", name: "Visla", desc: "AI video from script & recording", category: "video", pricing: "Freemium", url: "https://visla.us", rating: 4.5 },
  { slug: "virbo", name: "Virbo", desc: "AI talking photo & video", category: "video", pricing: "Freemium", url: "https://virbo.wondershare.com", rating: 4.5 },
  { slug: "flexclip", name: "FlexClip AI", desc: "AI video maker 1000+ templates", category: "video", pricing: "Freemium", url: "https://www.flexclip.com", rating: 4.5 },
  { slug: "lumen5", name: "Lumen5", desc: "Blog posts to videos auto", category: "video", pricing: "Freemium", url: "https://lumen5.com", rating: 4.4 },
  { slug: "deepbrain", name: "DeepBrain AI", desc: "Realistic AI humans video", category: "video", pricing: "Paid", url: "https://www.aistudios.com", rating: 4.6 },
  { slug: "hour-one", name: "Hour One", desc: "Text to video virtual presenters", category: "video", pricing: "Paid", url: "https://hourone.ai", rating: 4.4 },
  { slug: "kapwing", name: "Kapwing AI", desc: "AI editor smart cut & subtitles", category: "video", pricing: "Freemium", url: "https://www.kapwing.com", rating: 4.5 },
  { slug: "rask", name: "Rask AI", desc: "Video translation 130+ languages", category: "video", pricing: "Freemium", url: "https://www.rask.ai", rating: 4.7 },
  { slug: "wisecut", name: "Wisecut", desc: "Auto edit cuts silences", category: "video", pricing: "Freemium", url: "https://www.wisecut.video", rating: 4.5 },
  { slug: "animoto", name: "Animoto", desc: "Drag & drop AI video maker", category: "video", pricing: "Freemium", url: "https://animoto.com", rating: 4.4 },
  { slug: "wave-video", name: "Wave.video", desc: "AI video marketing platform", category: "video", pricing: "Freemium", url: "https://wave.video", rating: 4.5 },
  { slug: "novai", name: "Nova AI", desc: "AI video editing & subtitle", category: "video", pricing: "Freemium", url: "https://www.nova-ai.com", rating: 4.4 },
  { slug: "timebolt", name: "TimeBolt", desc: "Auto cut silences instantly", category: "video", pricing: "Paid", url: "https://www.timebolt.io", rating: 4.5 },
  { slug: "shuffll", name: "Shuffll", desc: "AI video production for teams", category: "video", pricing: "Paid", url: "https://www.shuffll.com", rating: 4.3 },
  { slug: "vmaker", name: "Vmaker AI", desc: "AI editor & screen recorder", category: "video", pricing: "Freemium", url: "https://www.vmaker.com", rating: 4.4 },
  { slug: "glia", name: "GliaCloud", desc: "AI video from news/articles", category: "video", pricing: "Paid", url: "https://www.gliacloud.com", rating: 4.3 },
  { slug: "steve-ai", name: "Steve.AI", desc: "Text to animated video", category: "video", pricing: "Freemium", url: "https://www.steve.ai", rating: 4.4 },
  { slug: "fliz", name: "Fliz AI", desc: "Blogs into videos auto", category: "video", pricing: "Freemium", url: "https://fliz.ai", rating: 4.4 },
  { slug: "synthesys", name: "Synthesys X", desc: "Human-like avatars video", category: "video", pricing: "Paid", url: "https://synthesysx.com", rating: 4.4 },
  { slug: "movio", name: "Movio", desc: "AI spokesperson video", category: "video", pricing: "Freemium", url: "https://www.movio.la", rating: 4.5 },
  { slug: "create-studio", name: "CreateStudio", desc: "3D characters & animation", category: "video", pricing: "Paid", url: "https://www.createstudio.com", rating: 4.4 },
  { slug: "big-vid", name: "BigVid AI", desc: "TikTok & Reels generator", category: "video", pricing: "Freemium", url: "https://bigvid.ai", rating: 4.3 },
  { slug: "videotok", name: "Videotok", desc: "Script to TikTok 1 click", category: "video", pricing: "Freemium", url: "https://videotok.io", rating: 4.4 },
  { slug: "papercup", name: "Papercup", desc: "AI dubbing human sound", category: "video", pricing: "Paid", url: "https://www.papercup.com", rating: 4.6 },
  { slug: "rephrase", name: "Rephrase.ai", desc: "Text to video avatars", category: "video", pricing: "Paid", url: "https://www.rephrase.ai", rating: 4.4 },
  { slug: "quickvid", name: "QuickVid AI", desc: "YouTube Shorts AI", category: "video", pricing: "Paid", url: "https://quickvid.ai", rating: 4.3 },
  { slug: "dubverse", name: "Dubverse", desc: "AI dubbing & subtitles", category: "video", pricing: "Freemium", url: "https://dubverse.ai", rating: 4.5 },
  { slug: "yepic", name: "Yepic AI", desc: "Dubbing & avatar creation", category: "video", pricing: "Paid", url: "https://www.yepic.ai", rating: 4.4 },
  { slug: "exemplary", name: "Exemplary AI", desc: "Repurpose videos AI summaries", category: "video", pricing: "Paid", url: "https://exemplary.ai", rating: 4.4 },
  { slug: "rawshorts", name: "Raw Shorts", desc: "Explainer video maker", category: "video", pricing: "Freemium", url: "https://www.rawshorts.com", rating: 4.3 },
  { slug: "designs-ai", name: "Designs.ai", desc: "Script to video voiceover", category: "video", pricing: "Freemium", url: "https://designs.ai", rating: 4.4 },
  { slug: "midjourney", name: "Midjourney", desc: "Best AI art stunning realism", category: "image", pricing: "Paid", url: "https://www.midjourney.com", rating: 4.9 },
  { slug: "dalle3", name: "DALL·E 3", desc: "OpenAI advanced text-to-image", category: "image", pricing: "Freemium", url: "https://openai.com/dall-e-3", rating: 4.8 },
  { slug: "leonardo-ai", name: "Leonardo AI", desc: "Game & art assets quality", category: "image", pricing: "Freemium", url: "https://leonardo.ai", rating: 4.7, affiliate: true },
  { slug: "firefly", name: "Adobe Firefly", desc: "Commercial-safe image gen", category: "image", pricing: "Freemium", url: "https://firefly.adobe.com", rating: 4.6 },
  { slug: "ideogram", name: "Ideogram", desc: "Perfect text in image AI", category: "image", pricing: "Free", url: "https://ideogram.ai", rating: 4.7 },
  { slug: "flux", name: "Flux AI", desc: "Next-gen open source model", category: "image", pricing: "Free", url: "https://flux1.ai", rating: 4.8 },
  { slug: "stable-diffusion", name: "Stable Diffusion XL", desc: "Powerful open-source model", category: "image", pricing: "Free", url: "https://stablediffusionweb.com", rating: 4.7 },
  { slug: "playground", name: "Playground AI", desc: "Free image generator & editor", category: "image", pricing: "Freemium", url: "https://playground.com", rating: 4.6 },
  { slug: "bing-image", name: "Bing Image Creator", desc: "Free DALL-E by Microsoft", category: "image", pricing: "Free", url: "https://www.bing.com/images/create", rating: 4.6 },
  { slug: "canva-magic", name: "Canva Magic Media", desc: "Text to image inside Canva", category: "image", pricing: "Freemium", url: "https://www.canva.com/magic-media/", rating: 4.6 },
  { slug: "dreamstudio", name: "DreamStudio", desc: "Official SD web app", category: "image", pricing: "Freemium", url: "https://dreamstudio.ai", rating: 4.5 },
  { slug: "getimg", name: "GetIMG AI", desc: "10+ models image gen", category: "image", pricing: "Freemium", url: "https://getimg.ai", rating: 4.5 },
  { slug: "lexica", name: "Lexica Art", desc: "Search & gen SD images", category: "image", pricing: "Freemium", url: "https://lexica.art", rating: 4.5 },
  { slug: "nightcafe", name: "NightCafe", desc: "AI art with huge community", category: "image", pricing: "Freemium", url: "https://creator.nightcafe.studio", rating: 4.5 },
  { slug: "starryai", name: "StarryAI", desc: "Mobile & web AI art", category: "image", pricing: "Freemium", url: "https://starryai.com", rating: 4.4 },
  { slug: "wombo-dream", name: "Dream by WOMBO", desc: "Free art generator app", category: "image", pricing: "Free", url: "https://dream.ai", rating: 4.4 },
  { slug: "craiyon", name: "Craiyon", desc: "Free unlimited generation", category: "image", pricing: "Free", url: "https://www.craiyon.com", rating: 4.2 },
  { slug: "fotor-ai", name: "Fotor AI Generator", desc: "Text to image editing", category: "image", pricing: "Freemium", url: "https://www.fotor.com/images/create", rating: 4.5 },
  { slug: "artbreeder", name: "Artbreeder", desc: "Collaborative character creator", category: "image", pricing: "Freemium", url: "https://www.artbreeder.com", rating: 4.4 },
  { slug: "deepai", name: "DeepAI Generator", desc: "Simple fast text2img", category: "image", pricing: "Freemium", url: "https://deepai.org/machine-learning-model/text2img", rating: 4.3 },
  { slug: "photosonic", name: "PhotoSonic", desc: "For marketers image gen", category: "image", pricing: "Freemium", url: "https://writesonic.com/photosonic", rating: 4.4 },
  { slug: "recraft", name: "Recraft AI", desc: "Vector & raster generator", category: "image", pricing: "Freemium", url: "https://www.recraft.ai", rating: 4.6 },
  { slug: "kittl", name: "Kittl AI", desc: "Design & t-shirt generator", category: "image", pricing: "Freemium", url: "https://www.kittl.com", rating: 4.5 },
  { slug: "freepik-ai", name: "Freepik AI", desc: "Stock + AI generator", category: "image", pricing: "Freemium", url: "https://www.freepik.com/ai/image-generator", rating: 4.5 },
  { slug: "shutterstock-ai", name: "Shutterstock AI", desc: "Licensed AI stock images", category: "image", pricing: "Paid", url: "https://www.shutterstock.com/ai-image-generator", rating: 4.5 },
  { slug: "dezgo", name: "Dezgo", desc: "Free SD no login", category: "image", pricing: "Free", url: "https://dezgo.com", rating: 4.3 },
  { slug: "hotpot", name: "Hotpot AI", desc: "Art maker & restoration", category: "image", pricing: "Freemium", url: "https://hotpot.ai", rating: 4.4 },
  { slug: "bluewillow", name: "BlueWillow", desc: "Free Midjourney alt Discord", category: "image", pricing: "Free", url: "https://www.bluewillow.ai", rating: 4.3 },
  { slug: "openart", name: "OpenArt", desc: "Art generator & prompts", category: "image", pricing: "Freemium", url: "https://openart.ai", rating: 4.5 },
  { slug: "artguru", name: "Artguru AI", desc: "Free avatar & portrait gen", category: "image", pricing: "Free", url: "https://www.artguru.ai", rating: 4.4 },
  { slug: "mage-space", name: "Mage.Space", desc: "Free unlimited SD", category: "image", pricing: "Free", url: "https://www.mage.space", rating: 4.4 },
  { slug: "dreamlike", name: "Dreamlike.art", desc: "SD art generator", category: "image", pricing: "Freemium", url: "https://dreamlike.art", rating: 4.4 },
  { slug: "image-fx", name: "ImageFX Google", desc: "Imagen 2 generator", category: "image", pricing: "Free", url: "https://aitestkitchen.withgoogle.com/tools/image-fx", rating: 4.6 },
  { slug: "gencraft", name: "Gencraft", desc: "Image & video generator", category: "image", pricing: "Freemium", url: "https://gencraft.com", rating: 4.4 },
  { slug: "picsart-ai", name: "Picsart AI", desc: "Text to image editing", category: "image", pricing: "Freemium", url: "https://picsart.com/ai-image-generator/", rating: 4.5 },
  { slug: "pixlr-ai", name: "Pixlr AI", desc: "Free image generation", category: "image", pricing: "Free", url: "https://pixlr.com/image-generator/", rating: 4.4 },
  { slug: "tensor-art", name: "Tensor.Art", desc: "Free SD online", category: "image", pricing: "Free", url: "https://tensor.art", rating: 4.4 },
  { slug: "segmind", name: "Segmind", desc: "Hosted SD & custom models", category: "image", pricing: "Freemium", url: "https://www.segmind.com", rating: 4.4 },
  { slug: "comfyui-cloud", name: "ComfyUI Cloud", desc: "Cloud ComfyUI gen", category: "image", pricing: "Freemium", url: "https://comfyui.com", rating: 4.5 },
  { slug: "stockimg", name: "Stockimg.ai", desc: "Logos & posters AI", category: "image", pricing: "Paid", url: "https://stockimg.ai", rating: 4.4 },
  { slug: "picfinder", name: "PicFinder AI", desc: "Image search & gen", category: "image", pricing: "Free", url: "https://picfinder.ai", rating: 4.3 },
  { slug: "limewire-ai", name: "LimeWire AI", desc: "Image & music gen", category: "image", pricing: "Freemium", url: "https://limewire.com", rating: 4.3 },
  { slug: "neural-love", name: "Neural Love", desc: "Art enhance & uncrop", category: "image", pricing: "Freemium", url: "https://neural.love/ai-art-generator", rating: 4.4 },
  { slug: "firefly-image3", name: "Firefly Image 3", desc: "Adobe photorealistic", category: "image", pricing: "Freemium", url: "https://firefly.adobe.com", rating: 4.7 },
  { slug: "youcam-ai", name: "YouCam AI Art", desc: "Avatar & art generator", category: "image", pricing: "Freemium", url: "https://www.perfectcorp.com/consumer/apps/yc-ai-art", rating: 4.3 },
  { slug: "ai-art-lab", name: "AI Art Lab", desc: "Free generator & editor", category: "image", pricing: "Free", url: "https://aiartlab.ai", rating: 4.2 },
  { slug: "prompthunt", name: "PromptHunt", desc: "Generator + prompt library", category: "image", pricing: "Freemium", url: "https://www.prompthunt.com", rating: 4.3 },
  { slug: "pixray", name: "Pixray", desc: "Open-source text2img", category: "image", pricing: "Free", url: "https://pixray.github.io", rating: 4.2 },
  { slug: "imagen-ai", name: "Imagen 2 Google", desc: "DeepMind text-to-image", category: "image", pricing: "Free", url: "https://deepmind.google/technologies/imagen-2/", rating: 4.7 },
  { slug: "remove-bg", name: "Remove.bg", desc: "Remove BG in 5 seconds", category: "image-editing", pricing: "Freemium", url: "https://www.remove.bg", rating: 4.8 },
  { slug: "photoroom", name: "PhotoRoom", desc: "BG remover product photos", category: "image-editing", pricing: "Freemium", url: "https://www.photoroom.com", rating: 4.7 },
  { slug: "clipdrop", name: "Clipdrop", desc: "Remove objects & relight", category: "image-editing", pricing: "Freemium", url: "https://clipdrop.co", rating: 4.7 },
  { slug: "cleanup", name: "Cleanup.pictures", desc: "Remove any object instant", category: "image-editing", pricing: "Freemium", url: "https://cleanup.pictures", rating: 4.6 },
  { slug: "magnific", name: "Magnific AI", desc: "Upscaler 8x quality", category: "image-editing", pricing: "Paid", url: "https://magnific.ai", rating: 4.8 },
  { slug: "topaz-photo", name: "Topaz Photo AI", desc: "Enhancer & denoise best", category: "image-editing", pricing: "Paid", url: "https://www.topazlabs.com/topaz-photo-ai", rating: 4.8 },
  { slug: "lets-enhance", name: "Let's Enhance", desc: "Upscaler to 4K", category: "image-editing", pricing: "Freemium", url: "https://letsenhance.io", rating: 4.5 },
  { slug: "vanceai", name: "VanceAI", desc: "Enhancer upscaler BG remover", category: "image-editing", pricing: "Freemium", url: "https://www.vanceai.com", rating: 4.5 },
  { slug: "slazzer", name: "Slazzer", desc: "BG remover API bulk", category: "image-editing", pricing: "Freemium", url: "https://www.slazzer.com", rating: 4.5 },
  { slug: "removal-ai", name: "Removal.AI", desc: "Free bulk BG remover", category: "image-editing", pricing: "Free", url: "https://removal.ai", rating: 4.4 },
  { slug: "fotor-editor", name: "Fotor AI Editor", desc: "One-tap enhance & retouch", category: "image-editing", pricing: "Freemium", url: "https://www.fotor.com", rating: 4.5 },
  { slug: "befunky", name: "BeFunky AI", desc: "Photo enhancer & art", category: "image-editing", pricing: "Freemium", url: "https://www.befunky.com", rating: 4.4 },
  { slug: "pixlr-editor", name: "Pixlr Editor", desc: "Free photo editor & remover", category: "image-editing", pricing: "Free", url: "https://pixlr.com", rating: 4.4 },
  { slug: "picsart-edit", name: "Picsart Editor", desc: "BG enhance retouch AI", category: "image-editing", pricing: "Freemium", url: "https://picsart.com", rating: 4.5 },
  { slug: "canva-editor", name: "Canva Photo Editor", desc: "Magic Edit & Eraser", category: "image-editing", pricing: "Freemium", url: "https://www.canva.com/photo-editor/", rating: 4.6 },
  { slug: "luminar-neo", name: "Luminar Neo", desc: "Sky replace & relight AI", category: "image-editing", pricing: "Paid", url: "https://skylum.com/luminar", rating: 4.6 },
  { slug: "adobe-ps-ai", name: "Photoshop AI", desc: "Generative Fill & Expand", category: "image-editing", pricing: "Paid", url: "https://www.adobe.com/products/photoshop.html", rating: 4.7 },
  { slug: "pixelz", name: "Pixelz AI", desc: "Product photo auto edit", category: "image-editing", pricing: "Paid", url: "https://www.pixelz.com", rating: 4.4 },
  { slug: "autoenhance", name: "Autoenhance.ai", desc: "Real estate photo AI", category: "image-editing", pricing: "Paid", url: "https://www.autoenhance.ai", rating: 4.4 },
  { slug: "zyro-ai", name: "Zyro BG Remover", desc: "Free BG removal Hostinger", category: "image-editing", pricing: "Free", url: "https://zyro.com/tools/image-background-remover", rating: 4.3 },
  { slug: "suno", name: "Suno AI", desc: "Full songs with vocals from text", category: "audio", pricing: "Freemium", url: "https://suno.com", rating: 4.9 },
  { slug: "elevenlabs", name: "ElevenLabs", desc: "Best text-to-speech & cloning", category: "audio", pricing: "Freemium", url: "https://elevenlabs.io", rating: 4.9, affiliate: true },
  { slug: "udio", name: "Udio", desc: "Amazing music tracks AI", category: "audio", pricing: "Freemium", url: "https://www.udio.com", rating: 4.7 },
  { slug: "mubert", name: "Mubert", desc: "Royalty-free AI music", category: "audio", pricing: "Freemium", url: "https://mubert.com", rating: 4.5 },
  { slug: "soundraw", name: "Soundraw", desc: "Mood & genre music gen", category: "audio", pricing: "Paid", url: "https://soundraw.io", rating: 4.6 },
  { slug: "boomy", name: "Boomy", desc: "Songs in seconds & release", category: "audio", pricing: "Free", url: "https://boomy.com", rating: 4.4 },
  { slug: "aiva", name: "AIVA", desc: "Emotional soundtracks composer", category: "audio", pricing: "Freemium", url: "https://www.aiva.ai", rating: 4.5 },
  { slug: "beatoven", name: "Beatoven.ai", desc: "Background music videos", category: "audio", pricing: "Freemium", url: "https://www.beatoven.ai", rating: 4.5 },
  { slug: "stable-audio", name: "Stable Audio", desc: "Text to music Stability", category: "audio", pricing: "Freemium", url: "https://www.stableaudio.com", rating: 4.6 },
  { slug: "adobe-podcast", name: "Adobe Podcast AI", desc: "Enhance voice & clean audio", category: "audio", pricing: "Free", url: "https://podcast.adobe.com/enhance", rating: 4.7 },
  { slug: "murf", name: "Murf AI", desc: "Voiceover 20+ languages", category: "audio", pricing: "Freemium", url: "https://murf.ai", rating: 4.6 },
  { slug: "lovo", name: "Lovo AI", desc: "400+ voices for video", category: "audio", pricing: "Freemium", url: "https://lovo.ai", rating: 4.5 },
  { slug: "playht", name: "Play.ht", desc: "Ultra-realistic TTS", category: "audio", pricing: "Freemium", url: "https://play.ht", rating: 4.6 },
  { slug: "krisp", name: "Krisp AI", desc: "Noise cancellation calls", category: "audio", pricing: "Freemium", url: "https://krisp.ai", rating: 4.6 },
  { slug: "otter", name: "Otter.ai", desc: "Transcription meetings AI", category: "audio", pricing: "Freemium", url: "https://otter.ai", rating: 4.7 },
  { slug: "fireflies", name: "Fireflies.ai", desc: "Meeting notes & transcription", category: "audio", pricing: "Freemium", url: "https://fireflies.ai", rating: 4.7 },
  { slug: "cleanvoice", name: "Cleanvoice AI", desc: "Remove filler podcast", category: "audio", pricing: "Paid", url: "https://cleanvoice.ai", rating: 4.5 },
  { slug: "wellsaid", name: "WellSaid Labs", desc: "Pro narration voice", category: "audio", pricing: "Paid", url: "https://wellsaidlabs.com", rating: 4.5 },
  { slug: "resemble", name: "Resemble AI", desc: "Voice clone detection", category: "audio", pricing: "Paid", url: "https://www.resemble.ai", rating: 4.5 },
  { slug: "altered", name: "Altered Studio", desc: "Change voice with AI", category: "audio", pricing: "Freemium", url: "https://www.altered.ai", rating: 4.4 },
  { slug: "copy-ai", name: "Copy.ai", desc: "Copywriter ads emails blogs", category: "business", pricing: "Freemium", url: "https://www.copy.ai", rating: 4.6, affiliate: true },
  { slug: "jasper", name: "Jasper AI", desc: "Marketing platform for teams", category: "business", pricing: "Paid", url: "https://www.jasper.ai", rating: 4.6, affiliate: true },
  { slug: "writesonic", name: "Writesonic", desc: "SEO & marketing writer", category: "business", pricing: "Freemium", url: "https://writesonic.com", rating: 4.5, affiliate: true },
  { slug: "tome", name: "Tome AI", desc: "Presentation storytelling AI", category: "business", pricing: "Freemium", url: "https://tome.app", rating: 4.6 },
  { slug: "gamma", name: "Gamma AI", desc: "Decks & docs 1 click AI", category: "business", pricing: "Freemium", url: "https://gamma.app", rating: 4.7 },
  { slug: "beautiful-ai", name: "Beautiful.ai", desc: "Auto design presentations", category: "business", pricing: "Paid", url: "https://www.beautiful.ai", rating: 4.5 },
  { slug: "chatbase", name: "Chatbase", desc: "Chatbot trained on your data", category: "business", pricing: "Freemium", url: "https://www.chatbase.co", rating: 4.6 },
  { slug: "intercom-ai", name: "Intercom Fin AI", desc: "Customer support chatbot AI", category: "business", pricing: "Paid", url: "https://www.intercom.com/fin", rating: 4.7 },
  { slug: "plus-ai", name: "Plus AI", desc: "AI for Google Slides PPT", category: "business", pricing: "Freemium", url: "https://www.plusdocs.com", rating: 4.5 },
  { slug: "persado", name: "Persado AI", desc: "Marketing language converts", category: "business", pricing: "Paid", url: "https://www.persado.com", rating: 4.5 },
  { slug: "notion-ai", name: "Notion AI", desc: "Writing & wiki productivity", category: "productivity", pricing: "Paid", url: "https://www.notion.so/product/ai", rating: 4.7 },
  { slug: "taskade", name: "Taskade AI", desc: "Tasks notes mindmaps", category: "productivity", pricing: "Freemium", url: "https://www.taskade.com", rating: 4.6 },
  { slug: "motion", name: "Motion AI", desc: "Calendar & task manager AI", category: "productivity", pricing: "Paid", url: "https://www.usemotion.com", rating: 4.6 },
  { slug: "reclaim", name: "Reclaim AI", desc: "Scheduling & habit tracking", category: "productivity", pricing: "Freemium", url: "https://reclaim.ai", rating: 4.5 },
  { slug: "bardeen", name: "Bardeen AI", desc: "Automation repetitive tasks", category: "productivity", pricing: "Freemium", url: "https://www.bardeen.ai", rating: 4.6 },
  { slug: "zapier-ai", name: "Zapier AI", desc: "Automate workflows AI", category: "productivity", pricing: "Freemium", url: "https://zapier.com/ai", rating: 4.7 },
  { slug: "grammarly", name: "Grammarly AI", desc: "Writing assistant grammar", category: "productivity", pricing: "Freemium", url: "https://www.grammarly.com", rating: 4.7 },
  { slug: "quillbot", name: "QuillBot AI", desc: "Paraphraser & writing tools", category: "productivity", pricing: "Freemium", url: "https://quillbot.com", rating: 4.6 },
  { slug: "mem-ai", name: "Mem AI", desc: "Notes organizes itself AI", category: "productivity", pricing: "Freemium", url: "https://mem.ai", rating: 4.5 },
  { slug: "wordtune", name: "Wordtune", desc: "Rewrite & summarizer AI", category: "productivity", pricing: "Freemium", url: "https://www.wordtune.com", rating: 4.5 },
]

export default function AIToolsPage(){
  const [search,setSearch] = useState("")
  const [activeCat,setActiveCat] = useState<CategoryKey>("original") // DEFAULT = free tools(6)

  const allTools = [...ORIGINAL_TOOLS, ...EXTERNAL_TOOLS]

  const filtered = allTools.filter((t) => {
    const q = search.toLowerCase()
    const matchSearch = (t.name + " " + t.desc).toLowerCase().includes(q)
    if (!matchSearch) return false
    if (activeCat === "all") return true
    return t.category === activeCat
  })

  const sidebarCats: { key: CategoryKey; label: string }[] = [
    { key: "original", label: "free tools(6)" },
    { key: "all", label: `All Tools (${allTools.length})` },
    { key: "video", label: "Video Generators (50)" },
    { key: "image", label: "Image Generators (50)" },
    { key: "image-editing", label: "Image Editing (20)" },
    { key: "audio", label: "Audio & Music (20)" },
    { key: "business", label: "Business Tools (10)" },
    { key: "productivity", label: "Productivity (10)" },
  ]

  return(
    <>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500&display=swap');
      :root{--bg:#EEF0EC;--ink:#14181A;--soft:#52585A;--line:#D2D6CC;--card:#FCFDFB;--teal:#0F6B5C;--tint:#E4EEEC}
      *{box-sizing:border-box;margin:0;padding:0} body{background:var(--bg);color:var(--ink);font-family:Inter,sans-serif}
      .wrap{max-width:1180px;margin:0 auto;padding:0 24px}
      .hero{padding:32px 0 22px;border-bottom:1px solid var(--line);background:var(--card)}
      .layout{display:flex;gap:20px;align-items:flex-start} @media(max-width:900px){.layout{flex-direction:column}}
      .sidebar{width:230px;flex-shrink:0;position:sticky;top:16px;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:12px} @media(max-width:900px){.sidebar{width:100%;position:static;display:flex;gap:8px;overflow-x:auto;white-space:nowrap}}
      .side-item{width:100%;text-align:left;padding:10px 12px;border-radius:8px;border:1px solid transparent;background:none;cursor:pointer;font-family:'IBM Plex Mono';font-size:.8rem;font-weight:500;color:var(--soft);display:flex;justify-content:space-between} @media(max-width:900px){.side-item{width:auto;flex-shrink:0;border:1px solid var(--line)}}
      .side-item.active{background:var(--ink);color:white;border-color:var(--ink)} .side-item.active.free{background:var(--teal);border-color:var(--teal)}
      .main{flex:1;min-width:0}
      .search-box{display:flex;gap:8px;background:var(--card);border:1px solid var(--line);border-radius:8px;padding:11px 14px;margin-bottom:16px}
      .search-box input{border:none;outline:none;width:100%;font-family:Inter;font-size:.9rem;background:none}
      .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px} @media(max-width:1100px){.grid{grid-template-columns:repeat(2,1fr)}} @media(max-width:600px){.grid{grid-template-columns:1fr}}
      .card{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:15px;display:flex;flex-direction:column;gap:9px;text-decoration:none;color:inherit}
      .card:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.06)}
      .card.original{border-color:var(--teal);background:linear-gradient(180deg,var(--tint) 0%,var(--card) 100%)}
      .ic{width:34px;height:34px;border-radius:7px;background:var(--tint);display:grid;place-items:center;font-weight:700;color:var(--teal);font-size:.85rem}
      .badge{font-size:.62rem;font-family:'IBM Plex Mono';padding:3px 6px;border-radius:4px;background:var(--bg);border:1px solid var(--line);width:fit-content}
      .badge.free{background:#E6F4EA;color:#1E7A3A} .badge.freemium{background:#FEF3C7;color:#92400E} .badge.paid{background:#FCE8E6;color:#A50E0E}
      .btn{margin-top:auto;background:var(--ink);color:white;padding:8px;border-radius:6px;text-align:center;font-size:.8rem;font-weight:600}
      .btn.teal{background:var(--teal)}
    `}</style>

    <div className="hero">
      <div className="wrap">
        <div style={{fontSize:'.85rem',color:'var(--soft)'}}><Link href="/">Home</Link> / AI Tools</div>
        <h1 style={{fontFamily:'Space Grotesk',fontSize:'2.2rem',fontWeight:700,marginTop:8}}>AI Tools</h1>
        <p style={{color:'var(--soft)',marginTop:6}}>6 free tools + 140 curated best AI tools.</p>
      </div>
    </div>

    <div className="wrap" style={{paddingTop:20, paddingBottom:60}}>
      <div className="layout">
        {/* SIDEBAR - Default = free tools(6) */}
        <div className="sidebar">
          <div style={{fontFamily:'IBM Plex Mono',fontSize:'.7rem',fontWeight:600,color:'var(--soft)',marginBottom:8,padding:'0 4px'}}>CATEGORIES</div>
          {sidebarCats.map((cat) => (
            <button key={cat.key} onClick={() => setActiveCat(cat.key)} className={`side-item ${activeCat===cat.key ? (cat.key==='original' ? 'active free' : 'active') : ''}`}>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* MAIN */}
        <div className="main">
          <div className="search-box">🔍<input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search in ${sidebarCats.find(c=>c.key===activeCat)?.label}...`} /></div>
          
          <div style={{fontFamily:'IBM Plex Mono',fontSize:'.75rem',color:'var(--soft)',marginBottom:12}}>
            Showing {filtered.length} tools in {sidebarCats.find(c=>c.key===activeCat)?.label}
          </div>

          <div className="grid">
            {filtered.map((t) => {
              const isExternal = !t.isOriginal
              return (
                <a key={t.slug} href={t.url} target={isExternal ? "_blank" : "_self"} rel={isExternal ? "noopener noreferrer" : ""} className={`card ${t.isOriginal ? "original" : ""}`}>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <div className="ic">{t.name[0]}</div>
                    <span className={`badge ${t.pricing.toLowerCase()}`}>{t.pricing}</span>
                  </div>
                  <div style={{fontWeight:600,fontSize:'.93rem'}}>{t.name} <span style={{fontSize:'.75rem',color:'var(--soft)'}}>★ {t.rating}</span></div>
                  <div style={{fontSize:'.83rem',color:'var(--soft)',lineHeight:1.4}}>{t.desc}</div>
                  {t.affiliate && <div style={{fontSize:'.68rem',color:'var(--teal)',fontFamily:'IBM Plex Mono'}}>★ Partner</div>}
                  <div className={`btn ${t.affiliate || t.isOriginal ? "teal" : ""}`}>{t.isOriginal ? "Open Free →" : "Use Tool → 1 Click"}</div>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}