import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, Trash2, Edit3, Type, Check, X, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { lyricsService } from '../services/lyricsService'
import toast from 'react-hot-toast'

export function SongView() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [song, setSong] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [fontSize, setFontSize] = useState('text-lg md:text-xl')
  
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editLyrics, setEditLyrics] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function fetchSong() {
      setLoading(true)
      try {
        const data = await lyricsService.getLyricById(id)
        if (data.userId !== user?.uid) {
           setError("You don't have permission to view these lyrics.")
        } else {
           setSong(data)
           setEditTitle(data.title)
           setEditLyrics(data.lyricsText)
        }
      } catch (err) {
        console.error('Error fetching song:', err)
        setError('Lyrics not found or could not be loaded.')
      } finally {
        setLoading(false)
      }
    }

    if (id && user) {
      fetchSong()
    }
  }, [id, user])

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete these lyrics?')) {
      try {
        await lyricsService.deleteLyric(id)
        toast.success('Lyrics deleted successfully')
        navigate('/')
      } catch (err) {
        toast.error('Failed to delete lyrics')
      }
    }
  }

  const handleSave = async () => {
    if (!editTitle || !editLyrics) {
      toast.error('Title and Lyrics are required')
      return
    }
    setSaving(true)
    try {
      await lyricsService.updateLyric(id, editTitle, editLyrics)
      setSong({ ...song, title: editTitle, lyricsText: editLyrics })
      setIsEditing(false)
      toast.success('Updated successfully')
    } catch (err) {
      toast.error('Failed to update lyrics')
    } finally {
      setSaving(false)
    }
  }

  const toggleFontSize = () => {
    setFontSize(prev => {
      if (prev === 'text-base md:text-lg') return 'text-lg md:text-xl'
      if (prev === 'text-lg md:text-xl') return 'text-xl md:text-2xl'
      return 'text-base md:text-lg'
    })
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-4 animate-pulse pt-10">
         <div className="w-16 h-8 bg-border-subtle/30 rounded-lg mb-12"></div>
         <div className="w-3/4 h-12 bg-border-subtle/30 rounded-lg mb-4"></div>
         <div className="w-1/3 h-6 bg-border-subtle/30 rounded-lg mb-16"></div>
         <div className="space-y-4">
           {[...Array(10)].map((_, i) => (
             <div key={i} className={`h-4 bg-border-subtle/20 rounded ${i % 4 === 0 ? 'w-5/6' : i % 3 === 0 ? 'w-2/3' : 'w-full'}`}></div>
           ))}
         </div>
      </div>
    )
  }

  if (error || !song) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center mt-12 card-base">
        <h2 className="text-3xl font-bold text-text-primary mb-4">Oops!</h2>
        <p className="text-interactive text-lg mb-8 max-w-md">{error || "We couldn't find the lyrics you were looking for."}</p>
        <button onClick={() => navigate('/')} className="px-6 py-3 bg-interactive text-bg-primary rounded-lg font-medium hover:bg-interactive-hover transition-colors focus-ring">
          Go Home
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in pb-16">
      <nav className="flex items-center justify-between mb-8 md:mb-12 sticky top-0 bg-bg-secondary/80 backdrop-blur-sm z-10 py-4 -mx-4 px-4 md:-mx-0 md:px-0">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-interactive hover:text-text-primary transition-colors focus-ring p-2 -ml-2 rounded-lg"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="font-semibold hidden sm:inline">Back</span>
        </button>

        <div className="flex items-center gap-1">
          {isEditing ? (
             <>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="p-2 md:p-3 text-green-600 hover:bg-green-50 rounded-xl transition-colors focus-ring"
                  title="Save changes"
                >
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5 md:w-6 md:h-6" />}
                </button>
                <button 
                  onClick={() => {
                    setIsEditing(false)
                    setEditTitle(song.title)
                    setEditLyrics(song.lyricsText)
                  }}
                  className="p-2 md:p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors focus-ring"
                  title="Cancel"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
             </>
          ) : (
            <>
              <button 
                onClick={toggleFontSize}
                className="p-2 md:p-3 text-interactive hover:bg-border-subtle/30 rounded-xl transition-colors focus-ring"
                title="Toggle font size"
              >
                <Type className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              
              <div className="w-px h-6 bg-border-subtle mx-1"></div>
              
              <button 
                onClick={() => setIsEditing(true)}
                className="p-2 md:p-3 text-interactive hover:bg-border-subtle/30 rounded-xl transition-colors focus-ring"
                title="Edit lyrics"
              >
                <Edit3 className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              <button 
                onClick={handleDelete}
                className="p-2 md:p-3 text-interactive hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors focus-ring group"
                title="Delete song"
              >
                <Trash2 className="w-5 h-5 md:w-6 md:h-6 group-hover:stroke-[2.5px]" />
              </button>
            </>
          )}
        </div>
      </nav>

      <article className="px-2 sm:px-0">
        {isEditing ? (
          <div className="space-y-6 animate-fade-in">
             <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="text-3xl md:text-5xl font-extrabold tracking-tighter text-text-primary w-full bg-bg-primary border-b-2 border-border-subtle focus:border-interactive outline-none pb-2 transition-colors"
                placeholder="Song Title"
             />
             <textarea
                value={editLyrics}
                onChange={(e) => setEditLyrics(e.target.value)}
                rows={20}
                className="w-full text-lg md:text-xl font-medium leading-relaxed bg-bg-primary border-2 border-border-subtle rounded-xl p-6 focus:border-interactive outline-none transition-colors resize-y min-h-[400px]"
                placeholder="Type or paste lyrics here..."
             />
          </div>
        ) : (
          <>
            <header className="mb-10 md:mb-14">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-text-primary mb-6 leading-tight max-w-4xl break-words">
                {song.title}
              </h1>
              <div className="flex items-center gap-2 text-sm text-interactive/60 font-semibold uppercase tracking-widest tabular-nums bg-bg-secondary px-3 py-1.5 rounded-md w-fit mt-6">
                <Clock className="w-4 h-4" />
                <span>Added on {song.createdAt ? new Date(song.createdAt).toLocaleDateString() : 'N/A'}</span>
              </div>
            </header>

            <div className={`prose-p:leading-[2.5] md:prose-p:leading-[2.75] prose-p:mb-8 text-text-primary ${fontSize} font-medium tracking-wide font-sans max-w-none`}>
              {song.lyricsText?.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-wrap break-words">{paragraph}</p>
              ))}
            </div>
            
            <div className="mt-24 pt-8 border-t border-border-subtle flex justify-center text-interactive/40 text-sm font-semibold uppercase tracking-widest">
               End of Lyrics
            </div>
          </>
        )}
      </article>
    </div>
  )
}
