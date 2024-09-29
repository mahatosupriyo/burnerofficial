'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { createPost } from '@/app/actions/post'

export function CreatePostForm() {
  const [preview, setPreview] = useState<string | null>(null)
  const { pending } = useFormStatus()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <form action={createPost} className="space-y-4">
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
          Image
        </label>
        <input
          type="file"
          id="file"
          name="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 block w-full"
          required
        />
        {preview && (
          <img src={preview} alt="Preview" className="mt-2 h-32 w-auto object-cover" />
        )}
      </div>
      <div>
        <label htmlFor="caption" className="block text-sm font-medium text-gray-700">
          Caption (optional)
        </label>
        <input
          type="text"
          id="caption"
          name="caption"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="links" className="block text-sm font-medium text-gray-700">
          Links (optional, comma-separated)
        </label>
        <input
          type="text"
          id="links"
          name="links"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {pending ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  )
}