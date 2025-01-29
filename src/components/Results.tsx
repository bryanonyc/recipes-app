import { Result } from 'antd'
import { ReactNode } from 'react';
import { useRouteError } from 'react-router-dom';

interface Props {
    extra: ReactNode
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

export const ERROR_500 = (props: Props) => {
    const error: any = useRouteError();
    const statusCode = error.status;
    console.log(error);
    let message = `An unexpected error occurred: ${error.statusText}`;
    if (statusCode === 503 || statusCode.startsWith('503')) {
        message = "The server is temporarily unable to handle your request.";
    }

    return (
        <Result
            status="500"
            title={statusCode}
            subTitle={message}
            extra={props.extra}
        />
    )
}
