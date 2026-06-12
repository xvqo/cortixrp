import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import RulesPage from './pages/RulesPage'
import TeamPage from './pages/TeamPage'
import StorePage from './pages/StorePage'
import PrivacyPage from './pages/PrivacyPage'
import BeginnerPage from './pages/BeginnerPage'
import { Analytics } from '@vercel/analytics/react'

function App() {
	return (
		<div className="app">
			<ScrollToTop />
			<Navbar />
			<main>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/regulamin" element={<RulesPage />} />
					<Route path="/ekipa" element={<TeamPage />} />
					<Route path="/sklep" element={<StorePage />} />
					<Route path="/polityka-prywatnosci" element={<PrivacyPage />} />
					<Route path="/dla-poczatkujacych" element={<BeginnerPage />} />
				</Routes>
			</main>
			<Footer />
		</div>
	)
}

export default App
