'use client'

import Footer from '@/components/Footer'
import InputSearchWord from '@/components/InputSearchWord'
import Navbar from '@/components/Navbar'
import TextAreaSearchWord from '@/components/TextAreaSearchWord'
import { WordProvider } from '@/contexts/WordProvider'

export default function Home() {
  return (
    <main>
      <Navbar />
      <WordProvider>
        <InputSearchWord />
        <TextAreaSearchWord />
      </WordProvider>
      <Footer />
    </main>
  )
}
