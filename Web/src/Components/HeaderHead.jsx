import React from 'react'
import { HiOutlineBell } from 'react-icons/hi'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

const HeaderHead = () => {
  return (
    <div className='bg-white h-16 px-4 text-black flex justify-end items-center'>
        <div className='flex items-center gap-9 mr-2 font-semibold'>
            <Popover>
                <PopoverButton className="block text-sm/6 font-semibold text-black/50 focus:outline-none">
                    <HiOutlineBell fontSize={24}/>
                </PopoverButton>
                <PopoverPanel
                    transition
                    anchor="bottom"
                    className="divide-y divide-white/5 rounded-xl bg-black/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0">
                    <div className="p-3">
                        <a className="block rounded-lg py-2 px-3 transition hover:bg-white/5" href="#">
                            <p className="font-semibold text-black">This is notification</p>
                        </a>
                    </div>
                </PopoverPanel>
            </Popover>
            <HiOutlineBell fontSize={24}/>
        </div>
    </div>
  )
}

export default HeaderHead