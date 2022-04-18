const RECORDING = 'RECORDING'
const PAUSED = 'PAUSED'
const STOPPED = 'STOPPED'
export interface RoutePath {
  coordinates: [string, string]
  speed: number
  timestamp: number
}

export interface RouteProps {
  path: RoutePath[]
  user: string // firebase uid
  status: 'RECORDING' | 'PAUSED' | 'STOPPED'
}

export default class Route {
  path: RoutePath[]
  user: string
  private status: 'RECORDING' | 'PAUSED' | 'STOPPED'

  constructor(userId: string) {
    this.user = userId
    this.path = []
    this.status = STOPPED
  }

  private changeStatus(status: 'RECORDING' | 'PAUSED' | 'STOPPED') {
    this.status = status
  }

  addPoint(point: RoutePath) {
    if (this.status !== RECORDING) return
    this.path.push(point)
  }

  startRoute(initialPoint: RoutePath) {
    this.changeStatus(RECORDING)
    if (this.path.length === 0) this.path.push(initialPoint)
  }

  endRoute() {
    this.changeStatus(STOPPED)
  }

  pauseRoute() {
    this.changeStatus(PAUSED)
  }
}
