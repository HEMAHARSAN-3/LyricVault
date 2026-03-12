import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusCircle, Type, AlignLeft, AlertCircle, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { lyricsService } from '../services/lyricsService'
import toast from 'react-hot-toast'

export function AddSong() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    lyrics: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setError(null)

    if (!formData.title || !formData.lyrics) {
      setError('All fields are required.')
      setLoading(false)
      return
    }

    try {
      const newId = await lyricsService.addLyric(
        formData.title,
        formData.lyrics,
        user.uid
      )
      toast.success('Lyrics added successfully!')
      navigate(`/song/${newId}`)
    } catch (err) {
      console.error('Error adding song:', err)
      setError('Failed to add the song. Please try again.')
      toast.error('Failed to add lyrics')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8 animate-fade-in pb-12">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-text-primary mb-2">Add Lyrics</h1>
        <p className="text-interactive opacity-80 text-lg">Contribute a new song to your collection.</p>
      </header>

      {error && (
         <div className="p-4 bg-interactive text-bg-primary rounded-lg flex items-center gap-3 animate-fade-in">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{error}</p>
         </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card-base p-6 md:p-8 space-y-8">
           
           <div className="space-y-2 relative">
             <label htmlFor="title" className="block text-sm font-bold text-interactive/80 uppercase tracking-widest pl-1">Song Title</label>
             <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Type className="h-5 w-5 text-interactive/40" />
                </div>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="block w-full pl-12 pr-4 py-4 bg-bg-secondary border border-border-subtle rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-text-primary focus:border-transparent transition-all font-medium text-lg placeholder-interactive/30"
                  placeholder="e.g. Bohemian Rhapsody"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
             </div>
           </div>

           <div className="space-y-2 relative">
             <label htmlFor="lyrics" className="block text-sm font-bold text-interactive/80 uppercase tracking-widest pl-1">Lyrics</label>
             <div className="relative">
                <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                  <AlignLeft className="h-5 w-5 text-interactive/40" />
                </div>
                <textarea
                  id="lyrics"
                  name="lyrics"
                  rows={15}
                  className="block w-full pl-12 pr-4 py-4 bg-bg-secondary border border-border-subtle rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-text-primary focus:border-transparent transition-all font-medium leading-relaxed resize-y placeholder-interactive/30"
                  placeholder="Is this the real life?&#10;Is this just fantasy?..."
                  value={formData.lyrics}
                  onChange={handleChange}
                  required
                />
             </div>
           </div>

        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-4 bg-text-primary text-bg-primary rounded-xl font-bold text-lg hover:bg-interactive-hover transition-colors focus-ring disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto justify-center"
          >
            {loading ? (
               <>
                 <Loader2 className="w-6 h-6 animate-spin" />
                 <span>Saving...</span>
               </>
            ) : (
               <>
                 <PlusCircle className="w-6 h-6" />
                 <span>Add to Library</span>
               </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
