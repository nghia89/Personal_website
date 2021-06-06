import React from 'react';

export const IconEmppty = (size?: number) => {
    return <svg id="file" enableBackground="new 0 0 300 300" height={size ? size : 250} viewBox="0 0 300 300" width={size ? size : 250} xmlns="http://www.w3.org/2000/svg"><g><circle cx="128.828" cy="150.001" fill="#e5efef" r="86" /><g><path d="m222.828 44.001h-120c-4.418 0-8 3.582-8 8v196c0 4.418 3.582 8 8 8h144c4.418 0 8-3.582 8-8v-172z" fill="#fff" /><path d="m246.828 260.001h-144c-6.617 0-12-5.383-12-12v-196c0-6.617 5.383-12 12-12h120c1.061 0 2.078.422 2.828 1.172l32 32c.75.75 1.172 1.766 1.172 2.828v172c0 6.617-5.383 12-12 12zm-144-212c-2.205 0-4 1.793-4 4v196c0 2.207 1.795 4 4 4h144c2.205 0 4-1.793 4-4v-170.343l-29.656-29.656h-118.344z" fill="#4c241d" /></g><g><path d="m222.828 76.001h32l-32-32z" fill="#efefd2" /><path d="m254.828 80.001h-32c-2.209 0-4-1.789-4-4v-32c0-1.617.975-3.078 2.469-3.695 1.496-.625 3.211-.277 4.359.867l32 32c1.145 1.145 1.486 2.863.867 4.359s-2.078 2.469-3.695 2.469zm-28-8h18.344l-18.344-18.344z" fill="#4c241d" /></g><g fill="#4c241d"><path d="m56.484 185.658c-1.023 0-2.047-.391-2.828-1.172l-11.312-11.312c-1.562-1.562-1.562-4.094 0-5.656s4.094-1.562 5.656 0l11.312 11.312c1.562 1.562 1.562 4.094 0 5.656-.781.781-1.804 1.172-2.828 1.172z" /><path d="m45.172 185.658c-1.023 0-2.047-.391-2.828-1.172-1.562-1.562-1.562-4.094 0-5.656l11.312-11.312c1.562-1.562 4.094-1.562 5.656 0s1.562 4.094 0 5.656l-11.312 11.312c-.781.781-1.805 1.172-2.828 1.172z" /><circle cx="78.828" cy="164.001" r="4" /><circle cx="66.828" cy="120.001" r="4" /></g></g></svg>
}

export const IconHome = (size?: number) => {
    let newSize = size ? size : 24;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="feather feather-home">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
}

export const IconMenu = (size?: number) => {
    let newSize = size ? size : 24;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
}

export const IconClose = (size?: number) => {
    let newSize = size ? size : 24;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
}

export const IconGrid = (size?: number) => {
    let newSize = size ? size : 24;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
}

export const IconList = (size?: number) => {
    let newSize = size ? size : 24;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
}

export const IconSearch = (size?: number) => {
    let newSize = size ? size : 24;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
}

export const IconBell = (size?: number) => {
    let newSize = size ? size : 24;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
}

export const IconUser = (size?: number) => {
    let newSize = size ? size : 24;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
}

export const IconLogout = (size?: number) => {
    let newSize = size ? size : 24;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
}


export const IconEdit = (size?: number) => {
    let newSize = size ? size : 24;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
}


export const IconTrash = (size?: number) => {
    let newSize = size ? size : 24;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
}

export const IconPlushSquare = (size?: number) => {
    let newSize = size ? size : 24;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
}


export const IconChevronRight = (size?: number) => {
    let newSize = size ? size : 24;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
}

export const IconChevronDown = (size?: number) => {
    let newSize = size ? size : 24;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
}
export const IconUsers = (size?: number) => {
    let newSize = size ? size : 24;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
}

export const IconArchive = (size?: number) => {
    let newSize = size ? size : 24;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-archive"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
}
export const IconShoppingCart = (size?: number) => {
    let newSize = size ? size : 24;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
}

export const IconSetting = (size?: number) => {
    let newSize = size ? size : 24;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
}
