// Listen for a submit
//status = document.querySelector(".contact-form").addEventListener("submit", submitForm);
const form = document.querySelector("form"),
    statusTxt = form.querySelector(".button-area span");

// function submitForm(e) {
//     e.preventDefault();
//     //   Get input Values
//     let name = document.querySelector(".name").value;
//     let email = document.querySelector(".email").value;
//     let message = document.querySelector(".feedback").value;
//     let id = document.querySelector(".id").value;
//     let phone = document.querySelector(".phone").value;
//     var arrInfo = [];
//     arrInfo.push(name, email, message, id, phone);
//     for (let i = 0; i < 5; i++) {
//         console.log(arrInfo[i]);
//     }
//     document.querySelector(".contact-form").reset();

//     sendEmail(name, email, id, phone, message);
// }
form.onsubmit = (e) => {
    e.preventDefault();
    statusTxt.style.color = "#0D6EFD";
    statusTxt.style.fontWeight = 600;
    statusTxt.style.display = "block";
    statusTxt.innerText = "Đang gửi ý kiến đóng góp của bạn...";
    form.classList.add("disabled");

    let name = document.querySelector(".name").value;
    let email = document.querySelector(".email").value;
    let message = document.querySelector(".feedback").value;
    let id = document.querySelector(".id").value;
    let phone = document.querySelector(".phone").value;


    var arrInfo = {
        "Name": name,
        "Email": email,
        "ID": id,
        "Phone": phone,
        "Message": message
    };
    console.log(arrInfo);

    //document.querySelector(".contact-form").reset();

    sendEmail(name, email, id, phone, message);
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function onlyDigits(s) {
    for (let i = s.length - 1; i >= 0; i--) {
        const d = s.charCodeAt(i);
        if (d < 48 || d > 57) return false
    }
    return true
}

function validName(name) {
    var cnt = 0;
    for (let i = 0; i < name.length; i++) {
        if (name[i] == " ")
            cnt++;
    }
    if (cnt > 0 && !onlyDigits(name))
        return true;
    else return false;
}

function sendEmail(name, email, id, phone, message) {
    if (name.length != 0 && email.length != 0 && id.length == 8 && phone.length == 10 && message.length != 0) {
        if (!onlyDigits(id)) {
            statusTxt.innerText = "MSSV sai định dạng, phải gồm 8 chữ số!\nVD: 21123721";
            statusTxt.style.color = "red";
            form.classList.add("enabled");
        } else if (!onlyDigits(phone)) {
            statusTxt.innerText = "SĐT sai định dạng, phải gồm 10 chữ số!\nVD: 0986030501";
            statusTxt.style.color = "red";
            form.classList.add("enabled");
        } else if (!validName(name)) {
            statusTxt.innerText = "Vui lòng nhập đúng Họ và tên\nVD: Nguyễn Văn A";
            statusTxt.style.color = "red";
            form.classList.add("enabled");
        } else if (validateEmail(email)) {
            form.classList.add("disabled");
            Email.send({
                Host: "smtp.gmail.com",
                Username: "dscteamus@gmail.com",
                Password: "dscdscdschcmus",
                To: 'dscteamus@gmail.com',
                From: email,
                Subject: name + " sent you a message",
                Body: "<b>Họ và tên: </b>" + name + "<br>" + "<b>MSSV: </b>" + id + "<br>" +
                    "<b>Số điện thoại: </b>" + phone +
                    "<br>" + "<b>Email: </b>" + email + "<br>" + "<b>Góp ý: </b>" + message,
            }).then((message) => statusTxt.innerText = "Đã gửi đi thành công\nCảm ơn bạn đã đóng góp ý kiến cho nhóm!")
        } else {
            statusTxt.innerText = "Email sai định dạng!\nExample@gmail.com";
            statusTxt.style.color = "red";
            form.classList.add("enabled");
        }
    } else {
        statusTxt.innerText = "Hãy điền thông tin đầy đủ và chính xác\n- Họ và tên cũng như Email phải đúng định dạng\n- SĐT gồm 10 chữ số\n- MSSV gồm 8 chữ số";
        statusTxt.style.color = "red";
        console.log("Lack of informations!");
        //document.querySelector(".contact-form").reset();
        form.classList.add("enabled");
    }

}