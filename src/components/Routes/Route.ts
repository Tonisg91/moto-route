import firestore, {
  firebase,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore'
import {GeoCoordinates} from 'react-native-geolocation-service'

const routeCollection = firestore().collection('routes')

export const RECORDING = 'RECORDING'
export const PAUSED = 'PAUSED'
export const STOPPED = 'STOPPED'
export interface RoutePath {
  coordinates: FirebaseFirestoreTypes.GeoPoint
  speed: number | null
  timestamp: number
}

export interface RouteProps {
  path: RoutePath[]
  user: string // firebase uid
  status: 'RECORDING' | 'PAUSED' | 'STOPPED'
  createdAt: Date
}

export default class Route {
  path: RoutePath[]
  user: string
  status: 'RECORDING' | 'PAUSED' | 'STOPPED'

  constructor(userId: string) {
    this.user = userId
    this.path = []
    this.status = STOPPED
  }

  private changeStatus(status: 'RECORDING' | 'PAUSED' | 'STOPPED') {
    this.status = status
  }

  addPoint(point: GeoCoordinates) {
    if (!point || this.status !== RECORDING) return

    const parsedPoint: RoutePath = {
      coordinates: new firebase.firestore.GeoPoint(
        point.latitude,
        point.longitude
      ),
      speed: point.speed,
      timestamp: Date.now(),
    }

    this.path.push(parsedPoint)
  }

  startRoute(initialPoint: RoutePath) {
    this.changeStatus(RECORDING)
    console.log(RECORDING)
    if (this.path.length === 0) this.path.push(initialPoint)
  }

  endRoute() {
    this.changeStatus(STOPPED)
    console.log(STOPPED)
  }

  pauseRoute() {
    this.changeStatus(PAUSED)
    console.log(PAUSED)
  }

  saveRoute() {
    if (this.status !== STOPPED) return
    routeCollection.add({
      path: this.path,
      user: this.user,
      createdAt: new Date(),
    })
  }
}
