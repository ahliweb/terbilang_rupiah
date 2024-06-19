function terbilang(n) {
    var angka = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
    var hasil = "";

    if (n < 12) {
        hasil = angka[n];
    } else if (n < 20) {
        hasil = angka[n - 10] + " Belas";
    } else if (n < 100) {
        hasil = angka[Math.floor(n / 10)] + " Puluh " + terbilang(n % 10);
    } else if (n < 200) {
        hasil = "Seratus " + terbilang(n - 100);
    } else if (n < 1000) {
        hasil = angka[Math.floor(n / 100)] + " Ratus " + terbilang(n % 100);
    } else if (n < 2000) {
        hasil = "Seribu " + terbilang(n - 1000);
    } else if (n < 1000000) {
        hasil = terbilang(Math.floor(n / 1000)) + " Ribu " + terbilang(n % 1000);
    } else if (n < 1000000000) {
        hasil = terbilang(Math.floor(n / 1000000)) + " Juta " + terbilang(n % 1000000);
    } else if (n < 1000000000000) {
        hasil = terbilang(Math.floor(n / 1000000000)) + " Milyar " + terbilang(n % 1000000000);
    } else if (n < 1000000000000000) {
        hasil = terbilang(Math.floor(n / 1000000000000)) + " Trilyun " + terbilang(n % 1000000000000);
    }

    return hasil.trim();
}

function terbilangRupiah(n) {
    if (isNaN(n) || n < 0) {
        return "Input tidak valid";
    }
    var hasilTerbilang = terbilang(n);
    return hasilTerbilang + " Rupiah";
}

// Fungsi yang dapat dipanggil di Google Spreadsheet
function TERBILANG_RUPIAH(number) {
    if (number === null || number === undefined || isNaN(number)) {
        return "Input tidak valid";
    }
    return terbilangRupiah(parseInt(number, 10));
}
