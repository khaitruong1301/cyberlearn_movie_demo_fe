import Swal from 'sweetalert2';
export const showMessageAlert = (title, message, type) => {
    Swal.fire({
        type: type,
        title: title,
        text: message,
        icon: type
    })
}

export const showMessageAlertEvent = (title, message, type) => {
    Swal.fire({
        type: type,
        title: title,
        text: message,
        icon: type,
        preConfirm: () => {
            window.location.reload();
        }
    }).then((result) => {
        if (result.value) {
        }
    })
}

