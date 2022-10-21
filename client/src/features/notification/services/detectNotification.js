import {
  AnnotationIcon,
  BellIcon,
  SwitchVerticalIcon,
  UserGroupIcon
} from '@heroicons/react/solid'

const notificationLink = (data) => ({
  'invitation-project': `/projects/invitation?pid=${data?.pid}`,
  'assign-to-issue': `/projects/issues/invitation?pid=${data?.pid}&iid=${data?.iid}`,
  'change-project': `/projects/${data?.pid}`,
  'change-issue': `/projects/${data?.pid}/${data?.iid}`
})

const notificationTitle = {
  'invitation-project': `Invite to join`,
  'assign-to-issue': `Assign to issue`,
  'change-project': `New updated in project`,
  'change-issue': `New updated in issue`
}

const notificationContent = {
  'invitation-project': `You have an invitation to join a new project.`,
  'assign-to-issue': `A new assigned issue is waiting for your approval.`,
  'change-project': `Your project has just been changed. Click to see details.`,
  'change-issue': `Your problem has just been changed. Click to see details.`
}

const notificationIcon = (type) => {
  const iconProps = {
    className: 'h-5 w-5'
  }

  switch (type) {
    case 'invitation-project': {
      return <UserGroupIcon {...iconProps} />
    }

    case 'assign-to-issue': {
      return <AnnotationIcon {...iconProps} />
    }

    case 'change-project':
    case 'change-issue': {
      return <SwitchVerticalIcon {...iconProps} />
    }

    default:
      return <BellIcon {...iconProps} />
  }
}

const detectNotification = (type, data) => ({
  icon: notificationIcon(type),
  link: notificationLink(data)[type],
  title: notificationTitle[type] || 'Notification',
  content: notificationContent[type] || 'Notification content'
})

export default detectNotification
