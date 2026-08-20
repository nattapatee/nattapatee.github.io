import { BentoGrid } from './components/BentoGrid'
import { PrintResume } from './components/PrintResume'
import { GameBoyIntro } from './components/effects/GameBoyIntro'
import { WalkingParade } from './components/effects/WalkingParade'
import { PixelBurst } from './components/effects/PixelBurst'

export default function App() {
  return (
    <>
      <div className="screen-only">
        <GameBoyIntro />
        <BentoGrid />
        <WalkingParade />
        <PixelBurst />
      </div>
      <PrintResume />
    </>
  )
}
