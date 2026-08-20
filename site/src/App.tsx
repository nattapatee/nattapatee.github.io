import { useCallback, useState } from 'react'
import { BentoGrid } from './components/BentoGrid'
import { PrintResume } from './components/PrintResume'
import { GameBoyIntro } from './components/effects/GameBoyIntro'
import { GbMenuButton } from './components/effects/GbMenuButton'
import { WalkingParade } from './components/effects/WalkingParade'
import { PixelBurst } from './components/effects/PixelBurst'

export default function App() {
  const [booted, setBooted] = useState(false)
  const [introRun, setIntroRun] = useState(0)

  const onIntroDone = useCallback(() => setBooted(true), [])
  const replayIntro = useCallback(() => {
    setBooted(false)
    setIntroRun((run) => run + 1)
  }, [])

  return (
    <>
      <div className={`screen-only ${booted ? 'app-booted' : 'app-waiting'}`}>
        <GameBoyIntro key={introRun} onDone={onIntroDone} />
        <BentoGrid key={`bento-${introRun}`} />
        <WalkingParade />
        <PixelBurst />
        <GbMenuButton onReplayIntro={replayIntro} />
      </div>
      <PrintResume />
    </>
  )
}
