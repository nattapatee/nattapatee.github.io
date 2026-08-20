import { BentoGrid } from './components/BentoGrid'
import { PrintResume } from './components/PrintResume'

export default function App() {
  return (
    <>
      <div className="screen-only">
        <BentoGrid />
      </div>
      <PrintResume />
    </>
  )
}
