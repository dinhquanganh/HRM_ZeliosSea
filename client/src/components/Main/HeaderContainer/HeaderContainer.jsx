import { Popover } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { LayoutContext } from 'context/LayoutContext'
import { useContext, useEffect, useState } from 'react'
import NotificationOverview from './NotificationOverview'
import { PageName } from './PageName'

export default function HeaderContainer({ pathName }) {
  const { sidebar } = useContext(LayoutContext)
  const [name, setName] = useState('')

  const toggleSidebar = () => {
    sidebar.toggle()
  }

  useEffect(() => {
    const list = {
      home: 'Home',
      timesheets: 'Timesheets',
      report: 'Report',
      workflow: 'Mission Overview',
      work: 'Workflow Overview',
      project: 'Project Overview',
      'project-setting': 'Project Setting',
      'project-invitation': 'Project Invitation',
      issue: 'Issue Overview',
      'issue-setting': 'Issue Setting',
      account: 'Account',
      notification: 'Notifications'
    }

    setName(list[pathName])
  }, [pathName])

  return (
    <div className='view_name z-20 bg-deepdark'>
      <div className='flex'>
        {sidebar.active ? (
          <ChevronLeftIcon
            className='relative -left-3 h-8 w-8 cursor-pointer'
            onClick={toggleSidebar}
          />
        ) : (
          <ChevronRightIcon
            className='relative -left-3 h-8 w-8 cursor-pointer'
            onClick={toggleSidebar}
          />
        )}
        <PageName name={name} />
      </div>

      {/* Notification */}
      {pathName !== 'notification' && (
        <Popover className='relative'>
          {({ open }) => (
            <>
              <Popover.Button
                className='relative cursor-pointer rounded-[4px] 
                border border-neutral-600/50 bg-neutral-600/40 px-2.5 
                py-1 transition-all duration-75 hover:bg-neutral-600/50'
              >
                <BellIcon className='w-4 text-neutral-50/75' />
                {}
                <span class='absolute -right-1 -top-1 flex h-2 w-2'>
                  <span
                    class='absolute inline-flex h-full w-full 
                    animate-ping rounded-full bg-emerald-400 opacity-75'
                  ></span>
                  <span
                    class='relative inline-flex h-2 w-2 rounded-full 
                    bg-emerald-500'
                  ></span>
                </span>
              </Popover.Button>
              <NotificationOverview />
            </>
          )}
        </Popover>
      )}
    </div>
  )
}
