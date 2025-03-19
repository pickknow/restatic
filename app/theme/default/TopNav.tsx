import { FormDocument, typeCollection } from '@/types/public'
import { Link, NavLink, } from '@remix-run/react'

import './TopNav.css'

const classNoAc = "absolute left-0 bottom-0 w-full h-[2px] bg-current origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
const classAc = "absolute left-0 bottom-0 w-full h-[2px] bg-current origin-left scale-x-100"
const default_avatar = "https://i.ibb.co/rfxVZc8w/android-chrome-192x192.png"

function capitalizeFirstLetter(str: string) {
  if (!str) {
    return str; // Return empty string or null if input is empty or null
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function TopNav({ collections, pages, settings }: { collections: typeCollection[], pages: FormDocument[], settings: any }) {
  const menus = [{ title: 'Home', slug: '' }, ...collections, ...pages]
  return (
    <div className="navbar bg-base-100 p-8">
      <div className="navbar-start ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {menus.map((item, index) => (
              <li key={index}>
                <Link to={`/${item.slug}`}>{capitalizeFirstLetter(item.title)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <Link to={'/'} className='relative inline-block group text-xl font-bold' >
          <span className="relative z-10 ">{settings.webSiteName || 'ReStatic'}</span>
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-current origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="flex flex-row gap-9 text-lg">
          {menus.map((item, index) => (
            <li key={index} >
              <NavLink to={`/${item.slug}`}>
                {({ isActive, isPending }) => (
                  <div className='relative inline-block group  text-gray-600 hover:text-black' >
                    <span className="relative z-10">{capitalizeFirstLetter(item.title)}</span>
                    <span className={isActive ? classAc : classNoAc} ></span>
                  </div>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end ">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <Link className="w-10 rounded-full z-10" to="https://github.com/pickknow" target="_blank">
            <img className='rounded-full w-12 h-12' src={settings?.avatar as string || default_avatar} />
          </Link>
          <div className="absolute" >
            <svg height="56" width="56" viewBox="0 0 56 56" className='animate-spin-slow hover:animate-spin-fast'>
              <path d="M29.465,0.038373A28,28,0,0,1,52.948,40.712L51.166,39.804A26,26,0,0,0,29.361,2.0356Z" className="text-yellow-500" fill="currentColor"></path>
              <path d="M51.483,43.250A28,28,0,0,1,4.5172,43.250L6.1946,42.161A26,26,0,0,0,49.805,42.161Z" className="text-blue-500" fill="currentColor"></path>
              <path d="M3.0518,40.712A28,28,0,0,1,26.535,0.038373L26.639,2.0356A26,26,0,0,0,4.8338,39.804Z" className="text-red-500" fill="currentColor">
              </path></svg>
          </div>
        </div>

      </div>
    </div>
  )
}
