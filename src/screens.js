import { Navigation } from 'react-native-navigation'

import Profile from './pages/Profile'
import Influencers from './pages/Influencers'
import Trending from './pages/Trending'
import InfluencerPosts from './pages/InfluencerPosts'
import Login from './pages/Login'

export function registerScreens (store, Provider) {
  Navigation.registerComponent('myInfluencer.Profile', () => Profile, store, Provider)
  Navigation.registerComponent('myInfluencer.Influencers', () => Influencers, store, Provider)
  Navigation.registerComponent('myInfluencer.Influencer', () => Influencer, store, Provider)
  Navigation.registerComponent('myInfluencer.Trending', () => Trending, store, Provider)
  Navigation.registerComponent('myInfluencer.InfluencerPosts', () => InfluencerPosts, store, Provider)
  Navigation.registerComponent('myInfluencer.Login', () => Login, store, Provider)
}