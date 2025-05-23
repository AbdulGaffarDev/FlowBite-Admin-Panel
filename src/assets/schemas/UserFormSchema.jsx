import * as Yup from 'yup';

const UserFormSchema = Yup.object({
    firstName : Yup.string()
        .min(3, 'At least 3 characters are required')
        .max(15, 'Max limit is 15 characters')
        .required("First name is required"),
    lastName : Yup.string()
        .min(3, "At least 3 characters are required")
        .max(15, 'Max limit is 15 characters'),
    email : Yup.string()
        .email()
        .required("Email is required"),
    position : Yup.string()
        .min(2, 'At least 2 characters are required')
        .max(25, 'Max limit is 25 characters')
        .required("Positon is required"),
    bio : Yup.string()
        .max(50, 'Max limit is 50 characters'),
    currentPassword: Yup.string()
        .min(6, 'At least 6 characters are required')
        .max(15, 'Max limit is 15 characters'),

    newPassword: Yup.string()
        .min(6, 'At least 6 characters are required')
        .max(15, 'Max limit is 15 characters')
        .test(
            'both-or-none',
            'Both password fields are required',
           function (value) {
                const { currentPassword } = this.parent;
                const bothEmpty = !value && !currentPassword;
                const bothFilled = value && currentPassword;
                return bothEmpty || bothFilled;
            }
            )
        .test(
            'not-same',
            'Must be different from current password',
            function (value) {
                const { currentPassword } = this.parent;
                if (!value || !currentPassword) return true;
                return value !== currentPassword;
            }
        ),
})

export default UserFormSchema;