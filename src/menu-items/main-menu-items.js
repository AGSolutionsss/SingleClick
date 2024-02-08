import React from 'react';
import {FormattedMessage} from 'react-intl';

import {
    IconAtom,
    IconBasket,
    IconBellRinging,
    IconBorderAll,
    IconBorderRadius,
    IconBoxMultiple,
    IconBrandChrome,
    IconBrandGravatar,
    IconBrush,
    IconBug,
    IconCalendar,
    IconChartArcs,
    IconChartCandle,
    IconChartInfographic,
    IconCircle,
    IconCircleOff,
    IconClipboardList,
    IconDashboard,
    IconDeviceAnalytics,
    IconFiles,
    IconForms,
    IconHelp,
    IconId,
    IconKey,
    IconLayoutList,
    IconLoader,
    IconLockAccess,
    IconMail,
    IconMenu,
    IconMessages,
    IconNfc,
    IconPalette,
    IconPencil,
    IconPhoneCall,
    IconPictureInPicture,
    IconReceipt2,
    IconRun,
    IconShadow,
    IconShape,
    IconShieldLock,
    IconSitemap,
    IconTools,
    IconTypography,
    IconUser,
    IconUserCheck
} from '@tabler/icons';

const icons = {
    IconDashboard: IconDashboard,
    IconDeviceAnalytics,

    IconChartArcs: IconChartArcs,
    IconClipboardList: IconClipboardList,
    IconChartInfographic: IconChartInfographic,

    IconForms: IconForms,
    IconReceipt2: IconReceipt2,
    IconPencil: IconPencil,
    IconPalette: IconPalette,
    IconShadow: IconShadow,
    IconPhoneCall: IconPhoneCall,
    IconBrandChrome: IconBrandChrome,
    IconFiles: IconFiles,
    IconAtom: IconAtom,
    IconTools: IconTools,
    IconBrush: IconBrush,
    IconLockAccess: IconLockAccess,
    IconShieldLock: IconShieldLock,
    IconKey: IconKey,
    IconTypography: IconTypography,
    IconMenu: IconMenu,
    IconBoxMultiple: IconBoxMultiple,
    IconCircleOff: IconCircleOff,
    IconCircle: IconCircle,
    IconBorderRadius: IconBorderRadius,
    IconBrandGravatar: IconBrandGravatar,
    IconShape: IconShape,
    IconUserCheck: IconUserCheck,
    IconId: IconId,
    IconLayoutList: IconLayoutList,
    IconBug: IconBug,
    IconLoader: IconLoader,
    IconRun: IconRun,
    IconUser: IconUser,
    IconHelp: IconHelp,
    IconSitemap: IconSitemap,
    IconPictureInPicture: IconPictureInPicture,
    IconMail: IconMail,
    IconMessages: IconMessages,
    IconNfc: IconNfc,
    IconCalendar: IconCalendar,
    IconBellRinging: IconBellRinging,
    IconBorderAll: IconBorderAll,
    IconChartCandle: IconChartCandle,
    IconBasket: IconBasket
};



    const menuItems = {
        items: [
            {
                
                id: 'dashboard',
                title: <FormattedMessage id="dashboard" />,
                type: 'group',
                children: [
                    {
                        id: 'dash-default',
                        title: <FormattedMessage id="Dashboard" />,
                        type: 'item',
                        url: '/dashboard',
                        icon: icons['IconDashboard'],
                        breadcrumbs: false
                    },
                    {
                        id: 'commingsoon',
                        title: <FormattedMessage id="Categories" />,
                        type: 'item',
                        url: '/category-list',
                        icon: icons['IconUserCheck'],
                        
                    },
                    {
                        id: 'member',
                        title: <FormattedMessage id="Categories Sub" />,
                        type: 'item',
                        url: '/category-sub-list',
                        icon: icons['IconUserCheck'],
                        
                    },
                ]
            },
            {
                id: 'utilities',
                title: <FormattedMessage id="Members" />,
                type: 'group',
                children: [
                    {
                        id: 'sample-page',
                        title: <FormattedMessage id="Users" />,
                        type: 'item',
                        url: '/users-list',
                        icon: icons['IconBrandChrome']
                    },
                    {
                        id: 'icons1',
                        title: <FormattedMessage id="Members" />,
                        type: 'item',
                        url: '/members-list',
                        icon: icons['IconPencil'],
                        
                    },
                    {
                        id: 'icons',
                        title: <FormattedMessage id="Profile" />,
                        type: 'item',
                        url: '/profile-edit',
                        icon: icons['IconCalendar'],
                        
                    },
                    
                ]
            },
        
        ]
    };

    



export default menuItems;


 


    


