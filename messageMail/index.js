const historyOrderMessage = ({ nameUser, id, nameCourse, payment_date, total_price }) => {
  const message = `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 10px;
        }
  
        .container {
          max-width: 600px;
          margin: auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #f8f8f8;
        }
  
        h2 {
          color: #333;
        }
  
        p {
          color: #555;
        }
  
        table {
          font-family: Arial, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }
  
        th,
        td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
  
        th {
          background-color: #f2f2f2;
        }
  
        .footer {
          margin-top: 20px;
          text-align: center;
          color: #888;
        }
      </style>
    </head>
  
    <body>
      <div class="container">
        <h2>Terima Kasih atas Pembelian Course di Tempat Kami!</h2>
        <p>Salam ${nameUser},</p>
        <p>
          Kami ingin mengucapkan terima kasih atas kepercayaan Anda memilih course
          kami di Dev Academy. Kami senang dapat menjadi bagian dari perjalanan
          pendidikan Anda.
        </p>
        <p>
          Course yang telah Anda beli dijamin memberikan pengalaman pembelajaran
          yang bermutu dan bernilai tambah. Kami berharap Anda dapat menikmati
          setiap materi yang disajikan dan meraih kesuksesan dalam perjalanan
          pendidikan Anda.
        </p>
        <p>
          Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan atau
          membutuhkan bantuan selama proses pembelajaran. Kami siap membantu Anda
          mencapai tujuan akademis Anda.
        </p>
        <p>Terima kasih sekali lagi atas dukungan Anda. Selamat belajar!</p>
        <p>Berikut ini detail Pemesanan</p>
        <table>
          <thead>
            <tr>
              <th>No. Pesanan</th>
              <th>Tanggal Pemesanan</th>
              <th>Nama Course</th>
              <th>Total Harga</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${id}</td>
              <td>${payment_date.getFullYear()}/${payment_date.getMonth() + 1}/${payment_date.getDate()}</td>
              <td>${nameCourse}</td>
              <td>${total_price}</td>
            </tr>
          </tbody>
        </table>
        <div class="footer">
          <p>
            Salam hangat, <br />
            Tim Dev Academy <br />
            Dev Academy
          </p>
        </div>
      </div>
    </body>
  </html>
  
    `
  return message
}

module.exports = { historyOrderMessage }
