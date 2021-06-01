import React from 'react';

export const IconEmppty = (size?: number) => {
    return <svg id="file" enable-background="new 0 0 300 300" height={size ? size : 250} viewBox="0 0 300 300" width={size ? size : 250} xmlns="http://www.w3.org/2000/svg"><g><circle cx="128.828" cy="150.001" fill="#e5efef" r="86" /><g><path d="m222.828 44.001h-120c-4.418 0-8 3.582-8 8v196c0 4.418 3.582 8 8 8h144c4.418 0 8-3.582 8-8v-172z" fill="#fff" /><path d="m246.828 260.001h-144c-6.617 0-12-5.383-12-12v-196c0-6.617 5.383-12 12-12h120c1.061 0 2.078.422 2.828 1.172l32 32c.75.75 1.172 1.766 1.172 2.828v172c0 6.617-5.383 12-12 12zm-144-212c-2.205 0-4 1.793-4 4v196c0 2.207 1.795 4 4 4h144c2.205 0 4-1.793 4-4v-170.343l-29.656-29.656h-118.344z" fill="#4c241d" /></g><g><path d="m222.828 76.001h32l-32-32z" fill="#efefd2" /><path d="m254.828 80.001h-32c-2.209 0-4-1.789-4-4v-32c0-1.617.975-3.078 2.469-3.695 1.496-.625 3.211-.277 4.359.867l32 32c1.145 1.145 1.486 2.863.867 4.359s-2.078 2.469-3.695 2.469zm-28-8h18.344l-18.344-18.344z" fill="#4c241d" /></g><g fill="#4c241d"><path d="m56.484 185.658c-1.023 0-2.047-.391-2.828-1.172l-11.312-11.312c-1.562-1.562-1.562-4.094 0-5.656s4.094-1.562 5.656 0l11.312 11.312c1.562 1.562 1.562 4.094 0 5.656-.781.781-1.804 1.172-2.828 1.172z" /><path d="m45.172 185.658c-1.023 0-2.047-.391-2.828-1.172-1.562-1.562-1.562-4.094 0-5.656l11.312-11.312c1.562-1.562 4.094-1.562 5.656 0s1.562 4.094 0 5.656l-11.312 11.312c-.781.781-1.805 1.172-2.828 1.172z" /><circle cx="78.828" cy="164.001" r="4" /><circle cx="66.828" cy="120.001" r="4" /></g></g></svg>
}

export const IconHome = (size?: number) => {
    let newSize = size ? size : 28;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        className="feather feather-home">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
}

export const IconMenu = (size?: number) => {
    let newSize = size ? size : 28;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
}

export const IconClose = (size?: number) => {
    let newSize = size ? size : 28;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
}

export const IconGrid = (size?: number) => {
    let newSize = size ? size : 28;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={size ? size : 28} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
}

export const IconList = (size?: number) => {
    let newSize = size ? size : 28;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
}

export const IconSearch = (size?: number) => {
    let newSize = size ? size : 28;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
}

export const IconBell = (size?: number) => {
    let newSize = size ? size : 28;
    return <svg xmlns="http://www.w3.org/2000/svg" width={newSize} height={newSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
}