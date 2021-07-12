
import React from "react";

import { AuthConsumer } from "@/providers/authProvider";

export default function SilentRenewClient() {
    return <AuthConsumer>
        {({ signInSilentCallback }) => {
            signInSilentCallback();
            return <span>loading</span>;
        }}
    </AuthConsumer>
}
