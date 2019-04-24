exports.constants =
    {
        local : {
            port:3000,
            ip:"149.129.146.41",
            db_name: 'PDS-WMS',
            // db_url:'mongodb://13.232.188.34:27017'
            db_url: 'mongodb://isham619:isham619@ds147125.mlab.com:47125/ishamblogs'           
        }
    };

exports.RETURN_STATUS = 
    {
        FIELDS_REQUIRED:{
            STATUS_CODE:403,
            MESSAGE:"Fields required"
        },
        SUCCESS:{
            STATUS_CODE:200,
            MESSAGE:"Success"
        },
        NOT_FOUND:{
            STATUS_CODE:404,
            MESSAGE:"Not found"
        },
        ERROR:{
            STATUS_CODE:400,
            MESSAGE:"Something went wrong"
        },
        UNAUTHORIZED:{
            STATUS_CODE:401,
            MESSAGE:"Authorization Required"
        },
        EXISTS:{
            STATUS_CODE:405,
            MESSAGE:"Record Already Exists"
        },
        VALIDATE_LENGTH:{
            STATUS_CODE:406,
            MESSAGE: "Field Length Not Correct"
        },
        DEACTIVATED_USER:{
            STATUS_CODE:407,
            MESSAGE: "User Blocked"
        }
    };
exports.limit = 8;
exports.ADMIN_EMAIL = 'support@sleeping8.com';
exports.API_AUTH =
    {
        USERNAME:"sleeping8",
        KEY: "yQq2sg+h",
    };

exports.UNAUTHORIZED_URLS =
[
    "/authenticate",
    "/authenticate/",
    "/authenticate/forgot",
    "/authenticate/forgot/",
];

exports.AWS={
    S3_ACCESS_KEY_ID:"AKIAIUFR67ZA66OAPJBQ",
    S3_SECRET_ACCESS_KEY:"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",
}