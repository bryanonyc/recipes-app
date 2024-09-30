import { Result } from 'antd'
import { ReactNode } from 'react';

interface Props {
    extra: ReactNode;
}

export const FORBIDDEN_403 = (props: Props) => {
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={props.extra}
        />
    )
}

export const NOT_FOUND_404 = (props: Props) => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you requested does not exist."
            extra={props.extra}
        />
    )
}

export const ENVIRONMENT_NOT_SETUP_WARNING = (props: Props) => {
    return (
        <Result
            status="warning"
            title="Missing Environment Variable"
            subTitle="A required environment variable is missing.  Please set either API_ENDPOINT_BASE_URL or REACT_APP_API_ENDPOINT_BASE_URL"
            extra={props.extra}
        />
    )
}
