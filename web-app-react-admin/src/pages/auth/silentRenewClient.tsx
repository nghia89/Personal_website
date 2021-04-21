
import React from "react";

import { AuthConsumer } from "@/providers/authProvider";

export default function SilentRenewClient() {
    return <AuthConsumer>
        {({ signInRedirect }) => {
            signInRedirect();
            return <span>loading</span>;
        }}
    </AuthConsumer>
}
