import { Avatar, createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { useEffect } from 'react'
import { apiUser } from '@/apis/index'
import { useState } from 'react';
import { UserVM } from '@/models';
import { getRandomColor } from '@/helpers/utils';


interface IProps {
    userId: string,
    userName?: string
}

export default function AvatarComponent(props: IProps) {

    const [user, setUser] = useState<UserVM | null>(null)

    useEffect(() => {
        if (user == null) {
            getUser()
        }
        return () => {

        }
    }, [props.userId])

    async function getUser() {
        let rsp = await apiUser.getById(props.userId);
        if (!rsp.isError) {
            setUser(rsp.data)
        }
    }

    let backRandom = getRandomColor(user?.fullName)
    return <Avatar style={{ background: backRandom.color, color: '#212529' }} alt={user?.fullName} src="" >
        {backRandom?.character}
    </Avatar>
}