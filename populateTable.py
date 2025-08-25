import requests
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

headers = {
    "Content-Type": "application/json"
}

#README: Toggle the first square bracket because the code is too long
#This is the pocketbase schema. Paste it in the Pocketbase "Settings" -> "Import collections" section to create the collections.
"""
[
    {
        "id": "pbc_3142635823",
        "listRule": null,
        "viewRule": null,
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "name": "_superusers",
        "type": "auth",
        "fields": [
            {
                "autogeneratePattern": "[a-z0-9]{15}",
                "hidden": false,
                "id": "text3208210256",
                "max": 15,
                "min": 15,
                "name": "id",
                "pattern": "^[a-z0-9]+$",
                "presentable": false,
                "primaryKey": true,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "cost": 0,
                "hidden": true,
                "id": "password901924565",
                "max": 0,
                "min": 8,
                "name": "password",
                "pattern": "",
                "presentable": false,
                "required": true,
                "system": true,
                "type": "password"
            },
            {
                "autogeneratePattern": "[a-zA-Z0-9]{50}",
                "hidden": true,
                "id": "text2504183744",
                "max": 60,
                "min": 30,
                "name": "tokenKey",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "exceptDomains": null,
                "hidden": false,
                "id": "email3885137012",
                "name": "email",
                "onlyDomains": null,
                "presentable": false,
                "required": true,
                "system": true,
                "type": "email"
            },
            {
                "hidden": false,
                "id": "bool1547992806",
                "name": "emailVisibility",
                "presentable": false,
                "required": false,
                "system": true,
                "type": "bool"
            },
            {
                "hidden": false,
                "id": "bool256245529",
                "name": "verified",
                "presentable": false,
                "required": false,
                "system": true,
                "type": "bool"
            },
            {
                "hidden": false,
                "id": "autodate2990389176",
                "name": "created",
                "onCreate": true,
                "onUpdate": false,
                "presentable": false,
                "system": true,
                "type": "autodate"
            },
            {
                "hidden": false,
                "id": "autodate3332085495",
                "name": "updated",
                "onCreate": true,
                "onUpdate": true,
                "presentable": false,
                "system": true,
                "type": "autodate"
            }
        ],
        "indexes": [
            "CREATE UNIQUE INDEX `idx_tokenKey_pbc_3142635823` ON `_superusers` (`tokenKey`)",
            "CREATE UNIQUE INDEX `idx_email_pbc_3142635823` ON `_superusers` (`email`) WHERE `email` != ''"
        ],
        "system": true,
        "authRule": "",
        "manageRule": null,
        "authAlert": {
            "enabled": true,
            "emailTemplate": {
                "subject": "Login from a new location",
                "body": "<p>Hello,</p>\n<p>We noticed a login to your {APP_NAME} account from a new location.</p>\n<p>If this was you, you may disregard this email.</p>\n<p><strong>If this wasn't you, you should immediately change your {APP_NAME} account password to revoke access from all other locations.</strong></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
            }
        },
        "oauth2": {
            "mappedFields": {
                "id": "",
                "name": "",
                "username": "",
                "avatarURL": ""
            },
            "enabled": false
        },
        "passwordAuth": {
            "enabled": true,
            "identityFields": [
                "email"
            ]
        },
        "mfa": {
            "enabled": false,
            "duration": 1800,
            "rule": ""
        },
        "otp": {
            "enabled": false,
            "duration": 180,
            "length": 8,
            "emailTemplate": {
                "subject": "OTP for {APP_NAME}",
                "body": "<p>Hello,</p>\n<p>Your one-time password is: <strong>{OTP}</strong></p>\n<p><i>If you didn't ask for the one-time password, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
            }
        },
        "authToken": {
            "duration": 86400
        },
        "passwordResetToken": {
            "duration": 1800
        },
        "emailChangeToken": {
            "duration": 1800
        },
        "verificationToken": {
            "duration": 259200
        },
        "fileToken": {
            "duration": 180
        },
        "verificationTemplate": {
            "subject": "Verify your {APP_NAME} email",
            "body": "<p>Hello,</p>\n<p>Thank you for joining us at {APP_NAME}.</p>\n<p>Click on the button below to verify your email address.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Verify</a>\n</p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
        },
        "resetPasswordTemplate": {
            "subject": "Reset your {APP_NAME} password",
            "body": "<p>Hello,</p>\n<p>Click on the button below to reset your password.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-password-reset/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Reset password</a>\n</p>\n<p><i>If you didn't ask to reset your password, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
        },
        "confirmEmailChangeTemplate": {
            "subject": "Confirm your {APP_NAME} new email address",
            "body": "<p>Hello,</p>\n<p>Click on the button below to confirm your new email address.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-email-change/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Confirm new email</a>\n</p>\n<p><i>If you didn't ask to change your email address, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
        }
    },
    {
        "id": "_pb_users_auth_",
        "listRule": "id = @request.auth.id",
        "viewRule": "id = @request.auth.id",
        "createRule": "",
        "updateRule": "id = @request.auth.id",
        "deleteRule": "id = @request.auth.id",
        "name": "users",
        "type": "auth",
        "fields": [
            {
                "autogeneratePattern": "[a-z0-9]{15}",
                "hidden": false,
                "id": "text3208210256",
                "max": 15,
                "min": 15,
                "name": "id",
                "pattern": "^[a-z0-9]+$",
                "presentable": false,
                "primaryKey": true,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "cost": 0,
                "hidden": true,
                "id": "password901924565",
                "max": 0,
                "min": 8,
                "name": "password",
                "pattern": "",
                "presentable": false,
                "required": true,
                "system": true,
                "type": "password"
            },
            {
                "autogeneratePattern": "[a-zA-Z0-9]{50}",
                "hidden": true,
                "id": "text2504183744",
                "max": 60,
                "min": 30,
                "name": "tokenKey",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "exceptDomains": null,
                "hidden": false,
                "id": "email3885137012",
                "name": "email",
                "onlyDomains": null,
                "presentable": false,
                "required": true,
                "system": true,
                "type": "email"
            },
            {
                "hidden": false,
                "id": "bool1547992806",
                "name": "emailVisibility",
                "presentable": false,
                "required": false,
                "system": true,
                "type": "bool"
            },
            {
                "hidden": false,
                "id": "bool256245529",
                "name": "verified",
                "presentable": false,
                "required": false,
                "system": true,
                "type": "bool"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text1579384326",
                "max": 255,
                "min": 0,
                "name": "name",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "text"
            },
            {
                "hidden": false,
                "id": "file376926767",
                "maxSelect": 1,
                "maxSize": 0,
                "mimeTypes": [
                    "image/jpeg",
                    "image/png",
                    "image/svg+xml",
                    "image/gif",
                    "image/webp"
                ],
                "name": "avatar",
                "presentable": false,
                "protected": false,
                "required": false,
                "system": false,
                "thumbs": null,
                "type": "file"
            },
            {
                "hidden": false,
                "id": "autodate2990389176",
                "name": "created",
                "onCreate": true,
                "onUpdate": false,
                "presentable": false,
                "system": false,
                "type": "autodate"
            },
            {
                "hidden": false,
                "id": "autodate3332085495",
                "name": "updated",
                "onCreate": true,
                "onUpdate": true,
                "presentable": false,
                "system": false,
                "type": "autodate"
            }
        ],
        "indexes": [
            "CREATE UNIQUE INDEX `idx_tokenKey__pb_users_auth_` ON `users` (`tokenKey`)",
            "CREATE UNIQUE INDEX `idx_email__pb_users_auth_` ON `users` (`email`) WHERE `email` != ''"
        ],
        "system": false,
        "authRule": "",
        "manageRule": null,
        "authAlert": {
            "enabled": true,
            "emailTemplate": {
                "subject": "Login from a new location",
                "body": "<p>Hello,</p>\n<p>We noticed a login to your {APP_NAME} account from a new location.</p>\n<p>If this was you, you may disregard this email.</p>\n<p><strong>If this wasn't you, you should immediately change your {APP_NAME} account password to revoke access from all other locations.</strong></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
            }
        },
        "oauth2": {
            "mappedFields": {
                "id": "",
                "name": "name",
                "username": "",
                "avatarURL": "avatar"
            },
            "enabled": false
        },
        "passwordAuth": {
            "enabled": true,
            "identityFields": [
                "email"
            ]
        },
        "mfa": {
            "enabled": false,
            "duration": 1800,
            "rule": ""
        },
        "otp": {
            "enabled": false,
            "duration": 180,
            "length": 8,
            "emailTemplate": {
                "subject": "OTP for {APP_NAME}",
                "body": "<p>Hello,</p>\n<p>Your one-time password is: <strong>{OTP}</strong></p>\n<p><i>If you didn't ask for the one-time password, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
            }
        },
        "authToken": {
            "duration": 604800
        },
        "passwordResetToken": {
            "duration": 1800
        },
        "emailChangeToken": {
            "duration": 1800
        },
        "verificationToken": {
            "duration": 259200
        },
        "fileToken": {
            "duration": 180
        },
        "verificationTemplate": {
            "subject": "Verify your {APP_NAME} email",
            "body": "<p>Hello,</p>\n<p>Thank you for joining us at {APP_NAME}.</p>\n<p>Click on the button below to verify your email address.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-verification/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Verify</a>\n</p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
        },
        "resetPasswordTemplate": {
            "subject": "Reset your {APP_NAME} password",
            "body": "<p>Hello,</p>\n<p>Click on the button below to reset your password.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-password-reset/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Reset password</a>\n</p>\n<p><i>If you didn't ask to reset your password, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
        },
        "confirmEmailChangeTemplate": {
            "subject": "Confirm your {APP_NAME} new email address",
            "body": "<p>Hello,</p>\n<p>Click on the button below to confirm your new email address.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-email-change/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Confirm new email</a>\n</p>\n<p><i>If you didn't ask to change your email address, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
        }
    },
    {
        "id": "pbc_4275539003",
        "listRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
        "viewRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
        "createRule": null,
        "updateRule": null,
        "deleteRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
        "name": "_authOrigins",
        "type": "base",
        "fields": [
            {
                "autogeneratePattern": "[a-z0-9]{15}",
                "hidden": false,
                "id": "text3208210256",
                "max": 15,
                "min": 15,
                "name": "id",
                "pattern": "^[a-z0-9]+$",
                "presentable": false,
                "primaryKey": true,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text455797646",
                "max": 0,
                "min": 0,
                "name": "collectionRef",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text127846527",
                "max": 0,
                "min": 0,
                "name": "recordRef",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text4228609354",
                "max": 0,
                "min": 0,
                "name": "fingerprint",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "hidden": false,
                "id": "autodate2990389176",
                "name": "created",
                "onCreate": true,
                "onUpdate": false,
                "presentable": false,
                "system": true,
                "type": "autodate"
            },
            {
                "hidden": false,
                "id": "autodate3332085495",
                "name": "updated",
                "onCreate": true,
                "onUpdate": true,
                "presentable": false,
                "system": true,
                "type": "autodate"
            }
        ],
        "indexes": [
            "CREATE UNIQUE INDEX `idx_authOrigins_unique_pairs` ON `_authOrigins` (collectionRef, recordRef, fingerprint)"
        ],
        "system": true
    },
    {
        "id": "pbc_2281828961",
        "listRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
        "viewRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
        "createRule": null,
        "updateRule": null,
        "deleteRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
        "name": "_externalAuths",
        "type": "base",
        "fields": [
            {
                "autogeneratePattern": "[a-z0-9]{15}",
                "hidden": false,
                "id": "text3208210256",
                "max": 15,
                "min": 15,
                "name": "id",
                "pattern": "^[a-z0-9]+$",
                "presentable": false,
                "primaryKey": true,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text455797646",
                "max": 0,
                "min": 0,
                "name": "collectionRef",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text127846527",
                "max": 0,
                "min": 0,
                "name": "recordRef",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text2462348188",
                "max": 0,
                "min": 0,
                "name": "provider",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text1044722854",
                "max": 0,
                "min": 0,
                "name": "providerId",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "hidden": false,
                "id": "autodate2990389176",
                "name": "created",
                "onCreate": true,
                "onUpdate": false,
                "presentable": false,
                "system": true,
                "type": "autodate"
            },
            {
                "hidden": false,
                "id": "autodate3332085495",
                "name": "updated",
                "onCreate": true,
                "onUpdate": true,
                "presentable": false,
                "system": true,
                "type": "autodate"
            }
        ],
        "indexes": [
            "CREATE UNIQUE INDEX `idx_externalAuths_record_provider` ON `_externalAuths` (collectionRef, recordRef, provider)",
            "CREATE UNIQUE INDEX `idx_externalAuths_collection_provider` ON `_externalAuths` (collectionRef, provider, providerId)"
        ],
        "system": true
    },
    {
        "id": "pbc_2279338944",
        "listRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
        "viewRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "name": "_mfas",
        "type": "base",
        "fields": [
            {
                "autogeneratePattern": "[a-z0-9]{15}",
                "hidden": false,
                "id": "text3208210256",
                "max": 15,
                "min": 15,
                "name": "id",
                "pattern": "^[a-z0-9]+$",
                "presentable": false,
                "primaryKey": true,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text455797646",
                "max": 0,
                "min": 0,
                "name": "collectionRef",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text127846527",
                "max": 0,
                "min": 0,
                "name": "recordRef",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text1582905952",
                "max": 0,
                "min": 0,
                "name": "method",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "hidden": false,
                "id": "autodate2990389176",
                "name": "created",
                "onCreate": true,
                "onUpdate": false,
                "presentable": false,
                "system": true,
                "type": "autodate"
            },
            {
                "hidden": false,
                "id": "autodate3332085495",
                "name": "updated",
                "onCreate": true,
                "onUpdate": true,
                "presentable": false,
                "system": true,
                "type": "autodate"
            }
        ],
        "indexes": [
            "CREATE INDEX `idx_mfas_collectionRef_recordRef` ON `_mfas` (collectionRef,recordRef)"
        ],
        "system": true
    },
    {
        "id": "pbc_1638494021",
        "listRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
        "viewRule": "@request.auth.id != '' && recordRef = @request.auth.id && collectionRef = @request.auth.collectionId",
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "name": "_otps",
        "type": "base",
        "fields": [
            {
                "autogeneratePattern": "[a-z0-9]{15}",
                "hidden": false,
                "id": "text3208210256",
                "max": 15,
                "min": 15,
                "name": "id",
                "pattern": "^[a-z0-9]+$",
                "presentable": false,
                "primaryKey": true,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text455797646",
                "max": 0,
                "min": 0,
                "name": "collectionRef",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text127846527",
                "max": 0,
                "min": 0,
                "name": "recordRef",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "cost": 8,
                "hidden": true,
                "id": "password901924565",
                "max": 0,
                "min": 0,
                "name": "password",
                "pattern": "",
                "presentable": false,
                "required": true,
                "system": true,
                "type": "password"
            },
            {
                "autogeneratePattern": "",
                "hidden": true,
                "id": "text3866985172",
                "max": 0,
                "min": 0,
                "name": "sentTo",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": true,
                "type": "text"
            },
            {
                "hidden": false,
                "id": "autodate2990389176",
                "name": "created",
                "onCreate": true,
                "onUpdate": false,
                "presentable": false,
                "system": true,
                "type": "autodate"
            },
            {
                "hidden": false,
                "id": "autodate3332085495",
                "name": "updated",
                "onCreate": true,
                "onUpdate": true,
                "presentable": false,
                "system": true,
                "type": "autodate"
            }
        ],
        "indexes": [
            "CREATE INDEX `idx_otps_collectionRef_recordRef` ON `_otps` (collectionRef, recordRef)"
        ],
        "system": true
    },
    {
        "id": "pbc_1717202528",
        "listRule": "",
        "viewRule": "",
        "createRule": "",
        "updateRule": "",
        "deleteRule": "",
        "name": "auto_renew_time_deposits",
        "type": "base",
        "fields": [
            {
                "autogeneratePattern": "[a-z0-9]{15}",
                "hidden": false,
                "id": "text3208210256",
                "max": 15,
                "min": 15,
                "name": "id",
                "pattern": "^[a-z0-9]+$",
                "presentable": false,
                "primaryKey": true,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text1579384326",
                "max": 0,
                "min": 0,
                "name": "name",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "text"
            },
            {
                "hidden": false,
                "id": "number848505574",
                "max": null,
                "min": null,
                "name": "daily_balance_for_interest",
                "onlyInt": false,
                "presentable": false,
                "required": false,
                "system": false,
                "type": "number"
            },
            {
                "hidden": false,
                "id": "number3477060368",
                "max": null,
                "min": null,
                "name": "35_days",
                "onlyInt": false,
                "presentable": false,
                "required": false,
                "system": false,
                "type": "number"
            },
            {
                "hidden": false,
                "id": "number1997922972",
                "max": null,
                "min": null,
                "name": "63_days",
                "onlyInt": false,
                "presentable": false,
                "required": false,
                "system": false,
                "type": "number"
            },
            {
                "hidden": false,
                "id": "number511942527",
                "max": null,
                "min": null,
                "name": "91_days",
                "onlyInt": false,
                "presentable": false,
                "required": false,
                "system": false,
                "type": "number"
            },
            {
                "hidden": false,
                "id": "number94419918",
                "max": null,
                "min": null,
                "name": "182_days",
                "onlyInt": false,
                "presentable": false,
                "required": false,
                "system": false,
                "type": "number"
            },
            {
                "hidden": false,
                "id": "number113497997",
                "max": null,
                "min": null,
                "name": "365_days",
                "onlyInt": false,
                "presentable": false,
                "required": false,
                "system": false,
                "type": "number"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text3217087507",
                "max": 0,
                "min": 0,
                "name": "features",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "text"
            },
            {
                "hidden": false,
                "id": "autodate2990389176",
                "name": "created",
                "onCreate": true,
                "onUpdate": false,
                "presentable": false,
                "system": false,
                "type": "autodate"
            },
            {
                "hidden": false,
                "id": "autodate3332085495",
                "name": "updated",
                "onCreate": true,
                "onUpdate": true,
                "presentable": false,
                "system": false,
                "type": "autodate"
            }
        ],
        "indexes": [],
        "system": false
    },
    {
        "id": "pbc_3495098437",
        "listRule": "",
        "viewRule": "",
        "createRule": "",
        "updateRule": "",
        "deleteRule": "",
        "name": "checking_accounts",
        "type": "base",
        "fields": [
            {
                "autogeneratePattern": "[a-z0-9]{15}",
                "hidden": false,
                "id": "text3208210256",
                "max": 15,
                "min": 15,
                "name": "id",
                "pattern": "^[a-z0-9]+$",
                "presentable": false,
                "primaryKey": true,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text1579384326",
                "max": 0,
                "min": 0,
                "name": "name",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "text"
            },
            {
                "hidden": false,
                "id": "number564787089",
                "max": null,
                "min": null,
                "name": "initial_deposit",
                "onlyInt": false,
                "presentable": false,
                "required": false,
                "system": false,
                "type": "number"
            },
            {
                "hidden": false,
                "id": "number3436259764",
                "max": null,
                "min": null,
                "name": "min_monthly_ad",
                "onlyInt": false,
                "presentable": false,
                "required": false,
                "system": false,
                "type": "number"
            },
            {
                "hidden": false,
                "id": "number848505574",
                "max": null,
                "min": null,
                "name": "daily_balance_for_interest",
                "onlyInt": false,
                "presentable": false,
                "required": false,
                "system": false,
                "type": "number"
            },
            {
                "hidden": false,
                "id": "number3477060368",
                "max": null,
                "min": null,
                "name": "interest_per_annum",
                "onlyInt": false,
                "presentable": false,
                "required": false,
                "system": false,
                "type": "number"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text3217087507",
                "max": 0,
                "min": 0,
                "name": "features",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "text"
            },
            {
                "hidden": false,
                "id": "autodate2990389176",
                "name": "created",
                "onCreate": true,
                "onUpdate": false,
                "presentable": false,
                "system": false,
                "type": "autodate"
            },
            {
                "hidden": false,
                "id": "autodate3332085495",
                "name": "updated",
                "onCreate": true,
                "onUpdate": true,
                "presentable": false,
                "system": false,
                "type": "autodate"
            }
        ],
        "indexes": [],
        "system": false
    },
    {
        "id": "pbc_188060245",
        "listRule": "",
        "viewRule": "",
        "createRule": "",
        "updateRule": "",
        "deleteRule": "",
        "name": "credit_cards",
        "type": "base",
        "fields": [
            {
                "autogeneratePattern": "[a-z0-9]{15}",
                "hidden": false,
                "id": "text3208210256",
                "max": 15,
                "min": 15,
                "name": "id",
                "pattern": "^[a-z0-9]+$",
                "presentable": false,
                "primaryKey": true,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text1579384326",
                "max": 0,
                "min": 0,
                "name": "name",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "text"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text105650625",
                "max": 0,
                "min": 0,
                "name": "category",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "text"
            },
            {
                "hidden": false,
                "id": "number87265556",
                "max": null,
                "min": null,
                "name": "min_annual_income",
                "onlyInt": false,
                "presentable": false,
                "required": false,
                "system": false,
                "type": "number"
            },
            {
                "hidden": false,
                "id": "number1463022827",
                "max": null,
                "min": null,
                "name": "annual_fee",
                "onlyInt": false,
                "presentable": false,
                "required": false,
                "system": false,
                "type": "number"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text3217087507",
                "max": 0,
                "min": 0,
                "name": "features",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "text"
            },
            {
                "hidden": false,
                "id": "bool1661858532",
                "name": "first_year_free",
                "presentable": false,
                "required": false,
                "system": false,
                "type": "bool"
            },
            {
                "hidden": false,
                "id": "autodate2990389176",
                "name": "created",
                "onCreate": true,
                "onUpdate": false,
                "presentable": false,
                "system": false,
                "type": "autodate"
            },
            {
                "hidden": false,
                "id": "autodate3332085495",
                "name": "updated",
                "onCreate": true,
                "onUpdate": true,
                "presentable": false,
                "system": false,
                "type": "autodate"
            }
        ],
        "indexes": [],
        "system": false
    },
    {
        "id": "pbc_2588434142",
        "listRule": "",
        "viewRule": "",
        "createRule": "",
        "updateRule": "",
        "deleteRule": "",
        "name": "retail_treasury_bonds",
        "type": "base",
        "fields": [
            {
                "autogeneratePattern": "[a-z0-9]{15}",
                "hidden": false,
                "id": "text3208210256",
                "max": 15,
                "min": 15,
                "name": "id",
                "pattern": "^[a-z0-9]+$",
                "presentable": false,
                "primaryKey": true,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text1579384326",
                "max": 0,
                "min": 0,
                "name": "name",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "text"
            },
            {
                "hidden": false,
                "id": "number564787089",
                "max": null,
                "min": null,
                "name": "initial_deposit",
                "onlyInt": false,
                "presentable": false,
                "required": false,
                "system": false,
                "type": "number"
            },
            {
                "hidden": false,
                "id": "number1908588469",
                "max": null,
                "min": null,
                "name": "interest_rate",
                "onlyInt": false,
                "presentable": false,
                "required": false,
                "system": false,
                "type": "number"
            },
            {
                "hidden": false,
                "id": "number1480739722",
                "max": null,
                "min": null,
                "name": "issue_price",
                "onlyInt": false,
                "presentable": false,
                "required": false,
                "system": false,
                "type": "number"
            },
            {
                "hidden": false,
                "id": "number419499762",
                "max": null,
                "min": null,
                "name": "interest_payments",
                "onlyInt": false,
                "presentable": false,
                "required": false,
                "system": false,
                "type": "number"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text3217087507",
                "max": 0,
                "min": 0,
                "name": "features",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "text"
            },
            {
                "hidden": false,
                "id": "autodate2990389176",
                "name": "created",
                "onCreate": true,
                "onUpdate": false,
                "presentable": false,
                "system": false,
                "type": "autodate"
            },
            {
                "hidden": false,
                "id": "autodate3332085495",
                "name": "updated",
                "onCreate": true,
                "onUpdate": true,
                "presentable": false,
                "system": false,
                "type": "autodate"
            }
        ],
        "indexes": [],
        "system": false
    },
    {
        "id": "pbc_3280439585",
        "listRule": "",
        "viewRule": "",
        "createRule": "",
        "updateRule": "",
        "deleteRule": "",
        "name": "savings_accounts",
        "type": "base",
        "fields": [
            {
                "autogeneratePattern": "[a-z0-9]{15}",
                "hidden": false,
                "id": "text3208210256",
                "max": 15,
                "min": 15,
                "name": "id",
                "pattern": "^[a-z0-9]+$",
                "presentable": false,
                "primaryKey": true,
                "required": true,
                "system": true,
                "type": "text"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text1579384326",
                "max": 0,
                "min": 0,
                "name": "name",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "text"
            },
            {
                "hidden": false,
                "id": "number564787089",
                "max": null,
                "min": null,
                "name": "initial_deposit",
                "onlyInt": false,
                "presentable": false,
                "required": false,
                "system": false,
                "type": "number"
            },
            {
                "hidden": false,
                "id": "number3436259764",
                "max": null,
                "min": null,
                "name": "min_monthly_ad",
                "onlyInt": false,
                "presentable": false,
                "required": false,
                "system": false,
                "type": "number"
            },
            {
                "hidden": false,
                "id": "number848505574",
                "max": null,
                "min": null,
                "name": "daily_balance_for_interest",
                "onlyInt": false,
                "presentable": false,
                "required": false,
                "system": false,
                "type": "number"
            },
            {
                "hidden": false,
                "id": "number3477060368",
                "max": null,
                "min": null,
                "name": "interest_per_annum",
                "onlyInt": false,
                "presentable": false,
                "required": false,
                "system": false,
                "type": "number"
            },
            {
                "autogeneratePattern": "",
                "hidden": false,
                "id": "text3217087507",
                "max": 0,
                "min": 0,
                "name": "features",
                "pattern": "",
                "presentable": false,
                "primaryKey": false,
                "required": false,
                "system": false,
                "type": "text"
            },
            {
                "hidden": false,
                "id": "autodate2990389176",
                "name": "created",
                "onCreate": true,
                "onUpdate": false,
                "presentable": false,
                "system": false,
                "type": "autodate"
            },
            {
                "hidden": false,
                "id": "autodate3332085495",
                "name": "updated",
                "onCreate": true,
                "onUpdate": true,
                "presentable": false,
                "system": false,
                "type": "autodate"
            }
        ],
        "indexes": [],
        "system": false
    }
]
"""
data = {
    "Savings Accounts": [
        {
            "Name": "Saver-Plus",
            "InitialDeposit": 3000.00,
            "MinMonthlyADB": 3000.00,
            "DailyBalanceToEarnInterest": 50000.00,
            "InterestRatePerAnnum": 0.0006,
            "Features": None
        },
        {
            "Name": "#SaveUp",
            "InitialDeposit": 1.00,
            "MinMonthlyADB": 0.00,
            "DailyBalanceToEarnInterest": 5000.00,
            "InterestRatePerAnnum": 0.0009,
            "Features": None
        },
        {
            "Name": "Maxi-saver",
            "InitialDeposit": 2000000.00,
            "MinMonthlyADB": 2000000.00,
            "DailyBalanceToEarnInterest": 2000000.00,
            "InterestRatePerAnnum": 0.0013,
            "Features": "Get a bonus 0.125% per annum if no withdrawal is made within the month."
        },
        {
            "Name": "Regular Savings",
            "InitialDeposit": 3000.00,
            "MinMonthlyADB": 3000.00,
            "DailyBalanceToEarnInterest": 5000.00,
            "InterestRatePerAnnum": 0.0006,
            "Features": None
        },
        {
            "Name": "Pamana Savings",
            "InitialDeposit": 25000.00,
            "MinMonthlyADB": 25000.00,  
            "DailyBalanceToEarnInterest": 25000.00,
            "InterestRatePerAnnum": 0.0006,
            "Features": "Free life insurance worth 3x your average account balance"
        },
        {
            "Name": "Pamana Savings (US Dollar)",
            "InitialDeposit": 1000.00,
            "MinMonthlyADB": 1000.00,
            "DailyBalanceToEarnInterest": 1000.00,
            "InterestRatePerAnnum": 0.0005,
            "Features": "Free life insurance worth 3x your average account balance"
        },
        {
            "Name": "#MySaveUp",
            "InitialDeposit": 1.00,
            "MinMonthlyADB": 0.00,
            "DailyBalanceToEarnInterest": 5000.00,
            "InterestRatePerAnnum": 0.0009,
            "Features": "Max 30,000 limit"
        },
        {
            "Name": "Pamana Padala",
            "InitialDeposit": 500.00,
            "MinMonthlyADB": 0.00,
            "DailyBalanceToEarnInterest": 5000.00,
            "InterestRatePerAnnum": 0.0006,
            "Features": "Daily balance to earn interest is USD 500 for US dollar accounts, and free life insurance up to PHP 300,000 or USD 6,000, and free personal accident insurance worth Php 100,000 for 90 days."
        },
        {
            "Name": "Padala Moneyger",
            "InitialDeposit": 0.00,
            "MinMonthlyADB": 0.00,
            "DailyBalanceToEarnInterest": 5000.00,
            "InterestRatePerAnnum": 0.0006,
            "Features": None
        }
    ],
    "Checking Accounts": [
        {
            "Name": "Regular Checking",
            "InitialDeposit": 10000.00,
            "MinMonthlyADB": 10000.00,
            "DailyBalanceToEarnInterest": 0.00,
            "InterestRatePerAnnum": 0.00,
            "Features": None
        },
        {
            "Name": "Maxi-one",
            "InitialDeposit": 25000.00,
            "MinMonthlyADB": 25000.00,
            "DailyBalanceToEarnInterest": 25000.00,
            "InterestRatePerAnnum": 0.0625,
            "Features": "0.0625 for PHP25,000 to PHP999,999"
        },
        {
            "Name": "Maxi-one",
            "InitialDeposit": 25000.00,
            "MinMonthlyADB": 25000.00,
            "DailyBalanceToEarnInterest": 25000.00,
            "InterestRatePerAnnum": 0.0925,
            "Features": "0.0925 for PHP1,000,000 and above"
        },
        {
            "Name": "Maxi-one Passbook",
            "InitialDeposit": 250000.00,
            "MinMonthlyADB": 500000.00,
            "DailyBalanceToEarnInterest": 25000.00,
            "InterestRatePerAnnum": 0.0625,
            "Features": "0.0625 for PHP25,000 to PHP999,999"
        },
        {
            "Name": "Maxi-one Passbook",
            "InitialDeposit": 250000.00,
            "MinMonthlyADB": 500000.00,
            "DailyBalanceToEarnInterest": 25000.00,
            "InterestRatePerAnnum": 0.0925,
            "Features": "0.0925 for PHP1,000,000 and above"
        },
        {
            "Name": "BizLink Checking",
            "InitialDeposit": 10000.00,
            "MinMonthlyADB": 10000.00,
            "DailyBalanceToEarnInterest": 0.00,
            "InterestRatePerAnnum": 0.00,
            "Features": "BizLink Mobile App for optmized SME banking"
        },
        {
            "Name": "Business Checking",
            "InitialDeposit": 10000.00,
            "MinMonthlyADB": 10000.00,
            "DailyBalanceToEarnInterest": 0.00,
            "InterestRatePerAnnum": 0.00,
            "Features": "N/A"
        }
    ],
    "Auto Renew Time Deposits": [
    {
      "Name": "Peso Auto Renew Tier 1",
      "DailyBalanceToEarnInterest": 50000,
        "35_days": 0.002500,
        "63_days": 0.002500,
        "91_days": 0.003750,
        "182_days": 0.003750,
        "365_days": 0.005000,
      "Features": "time deposit placement is automatically renewed, getting higher returns becomes hassle-free"
    },
    {
      "Name": "Peso Auto Renew Tier 2",
      "DailyBalanceToEarnInterest": 500000,

        "35_days": 0.003750,
        "63_days": 0.005000,
        "91_days": 0.005000,
        "182_days": 0.005000,
        "365_days": 0.005000
      ,
      "Features": "time deposit placement is automatically renewed, getting higher returns becomes hassle-free"
    },
    {
      "Name": "Peso Auto Renew Tier 3",
      "DailyBalanceToEarnInterest": 1000000,

        "35_days": 0.003750,
        "63_days": 0.005000,
        "91_days": 0.005000,
        "182_days": 0.005000,
        "365_days": 0.005000
      ,
      "Features": "time deposit placement is automatically renewed, getting higher returns becomes hassle-free"
    },
    {
      "Name": "Peso Auto Renew Tier 4",
      "DailyBalanceToEarnInterest": 5000000,

        "35_days": 0.005000,
        "63_days": 0.006250,
        "91_days": 0.006250,
        "182_days": 0.007500,
        "365_days": 0.007500
      ,
      "Features": "time deposit placement is automatically renewed, getting higher returns becomes hassle-free"
    }

      
    ],
    "Retail Treasury Bonds": [
        {
            "Name": "RTB",
            "InitialDeposit": 5000.00,
            "InterestRatePerAnnum": 0.04875,
            "IssuePrice": 1.00,
            "InterestPayments": "quarterly",
            "Features": "relatively higher yield and low risk investment"
        }
    ],
    "Credit Cards": [
        {
            "Name": "BPI Signature",
            "Category": "Premium Travel",
            "MinAnnualIncome": 1200000.00,
            "AnnualFee": 5500.00,
            "Features": "2 pts/₱20 spend, concierge, airport lounge access, ₱20M travel insurance",
            "FirstYearFree": True
        },
        {
            "Name": "Platinum Rewards",
            "Category": "Premium Travel / Rewards",
            "MinAnnualIncome": 1000000.00,
            "AnnualFee": 4000.00,
            "Features": "2 pts/₱20 foreign, 2 pts/₱30 local, lounge access, ₱10M travel insurance",
            "FirstYearFree": True
        },
        {
            "Name": "Gold Rewards",
            "Category": "Mid-tier Rewards",
            "MinAnnualIncome": 480000.00,
            "AnnualFee": 2250.00,
            "Features": "1 pt/₱35 spend, ₱10M travel insurance, flexible installments",
            "FirstYearFree": True
        },
        {
            "Name": "Amore Platinum Cashback Card",
            "Category": "Premium Cashback",
            "MinAnnualIncome": 1000000.00,
            "AnnualFee": 5000.00,
            "Features": "4% restaurants, 1% supermarkets, Ayala Malls perks, lounge access",
            "FirstYearFree": True
        },
        {
            "Name": "Amore Cashback Card",
            "Category": "Everyday Cashback",
            "MinAnnualIncome": 180000.00,
            "AnnualFee": 2050.00,
            "Features": "4% supermarkets, 1% drugstores & utilities, 0.3% elsewhere",
            "FirstYearFree": True
        },
        {
            "Name": "Rewards Card",
            "Category": "Entry-level Rewards",
            "MinAnnualIncome": 180000.00,
            "AnnualFee": 1550.00,
            "Features": "1 pt/₱35 spend, ₱2M travel insurance, budget-friendly starter card",
            "FirstYearFree": True
        },
        {
            "Name": "Petron-BPI Card",
            "Category": "Fuel / Commuter",
            "MinAnnualIncome": 180000.00,
            "AnnualFee": 1550.00,
            "Features": "3% fuel rebate, welcome ₱200 fuel voucher",
            "FirstYearFree": True
        },
        {
            "Name": "Edge Card",
            "Category": "Starter / Everyday",
            "MinAnnualIncome": 180000.00,
            "AnnualFee": 1320.00,
            "Features": "1 pt/₱50 spend, flexible installments, good for young professionals",
            "FirstYearFree": True
        },
        {
            "Name": "eCredit Card",
            "Category": "Online Security",
            "MinAnnualIncome": 0.00,
            "AnnualFee": 0.00,
            "Features": "Companion card with separate number, adjustable limit, no annual fee",
            "FirstYearFree": True
        },
        {
            "Name": "Corporate Card",
            "Category": "Business",
            "MinAnnualIncome": 0.00,
            "AnnualFee": 1700.00,
            "Features": "Extended payment terms, spend controls, expense management",
            "FirstYearFree": True
        },
        {
            "Name": "DOS Card",
            "Category": "Installment-focused",
            "MinAnnualIncome": 180000.00,
            "AnnualFee": 3000.00,
            "Features": "Dual-installment features, pay-in-2 flexibility",
            "FirstYearFree": True
        },
        {
            "Name": "Robinsons Cashback Card",
            "Category": "Grocery Shopping",
            "MinAnnualIncome": 180000.00,
            "AnnualFee": 2500.00,
            "Features": "Cashback and perks at Robinsons stores",
            "FirstYearFree": True
        }
    ]

}

def seed():
    # Savings Accounts
    for acct in data["Savings Accounts"]:
        record = {
            "name": acct["Name"],
            "initial_deposit": acct["InitialDeposit"],
            "min_monthly_adb": acct["MinMonthlyADB"],
            "daily_balance_for_interest": acct["DailyBalanceToEarnInterest"],
            "interest_per_annum": acct["InterestRatePerAnnum"],
            "features": acct["Features"],
        }
        r = requests.post(
            "http://127.0.0.1:8090/api/collections/savings_accounts/records",
            json=record,
            headers=headers
        )
        print(r.json())

    # Checking Accounts
    for acct in data["Checking Accounts"]:
        record = {
            "name": acct["Name"],
            "initial_deposit": acct["InitialDeposit"],
            "min_monthly_adb": acct["MinMonthlyADB"],
            "daily_balance_for_interest": acct["DailyBalanceToEarnInterest"],
            "interest_per_annum": acct["InterestRatePerAnnum"],
            "features": acct["Features"],
        }
        r = requests.post(
            "http://127.0.0.1:8090/api/collections/checking_accounts/records",
            json=record,
            headers=headers
        )
        print(r.json())

    # Auto Renew Time Deposits
    for acct in data["Auto Renew Time Deposits"]:
        record = {
            "name": acct["Name"],
            "daily_balance_for_interest": acct["DailyBalanceToEarnInterest"],
            "35_days": acct["35_days"],
            "63_days": acct["63_days"],
            "91_days": acct["91_days"],
            "182_days": acct["182_days"],
            "365_days": acct["365_days"],
            "features": acct["Features"],
        }
        r = requests.post(
            "http://127.0.0.1:8090/api/collections/auto_renew_time_deposits/records",
            json=record,
            headers=headers
        )
        #print(r.json())

# Retail Treasury Bonds
    for bond in data["Retail Treasury Bonds"]:
        record = {
            "name": bond["Name"],
            "initial_deposit": bond["InitialDeposit"],
            "interest_rate": bond["InterestRatePerAnnum"],
            "issue_price": bond["IssuePrice"],
            "interest_payments": bond["InterestPayments"],
            "features": bond["Features"]
        }
        r = requests.post(
            "http://127.0.0.1:8090/api/collections/retail_treasury_bonds/records",
            json=record,
            headers=headers
        )
        print(r.json())

    # Credit Cards
    for card in data["Credit Cards"]:
        record = {
            "name": card["Name"],
            "category": card["Category"],
            "min_annual_income": card["MinAnnualIncome"],
            "annual_fee": card["AnnualFee"],
            "features": card["Features"],
            "first_year_free": card["FirstYearFree"]
        }
        r = requests.post(
            "http://127.0.0.1:8090/api/collections/credit_cards/records",
            json=record,
            headers=headers
        )
        print(r.json())

    print("Seeding complete!")

if __name__ == "__main__":  
    seed()