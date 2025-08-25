export function Footer() {
  return (
    <footer className="py-12 text-white border-t border-gray-600" style={{ backgroundColor: "#5D5D5D" }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="border-t border-gray-600 w-full mb-8"></div>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <img src="/bpi-logo.png" alt="BPI Logo" className="h-8 w-auto" />
            </div>
            <p className="text-sm text-gray-300">Intelligent financial planning for every Filipino.</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-white">About BPI</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Overview
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Investor Relations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Governance
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  News
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-white">Site Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Data Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Financial Consumer Protection
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-white">Corporate Office</h4>
            <p className="text-sm text-gray-300">
              Bank of the Philippine Islands
              <br />
              Ayala Triangle Gardens Tower 2,
              <br />
              Paseo de Roxas corner Makati Avenue,
              <br />
              Makati City 1226
            </p>

            <div className="pt-4">
              <h5 className="font-semibold text-white mb-2">Follow Us</h5>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">© 2024 Bank of the Philippine Islands. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
