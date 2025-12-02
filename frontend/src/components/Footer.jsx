import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-blue-500 text-white py-4 mt-10">
            <div className="container mx-auto text-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} FACK STORE. All rights reserved.</p>
            </div>
        </footer>
    </div>
  )
}

export default Footer