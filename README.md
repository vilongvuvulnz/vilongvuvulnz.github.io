# Portofolio Website


This is web created using Vite and React. You can test it in <a href="https://kiuyha.my.id" target="_blank">kiuyha.my.id</a>

## Features
- **Neobrutalist UI**. This website use neobrutalist UI.
- **Responsive**. This website is responsive for all screen size.
- **Google Spreadsheet Data**. You can use google spreadsheet as database.

## Setup for your own
This tutorial will guide you how to setup this project for your own using github pages.
1. Fork this repository.
<img src="https://raw.githubusercontent.com/kiuyha/kiuyha.github.io/refs/heads/main/docs/ForkRepository.png">

2. Make a spreadsheet and add the data. You can check the format in <a href="https://docs.google.com/spreadsheets/d/1wiHW3SE8y8a6JosDY2538XPFa5Ydysw1yUb-qNMMbN4" target="_blank">here</a> and copy to your own.
<img src="https://raw.githubusercontent.com/kiuyha/kiuyha.github.io/refs/heads/main/docs/CopySpreadsheet.png">

3. Change the `.env.example` since it will be use for the deployment. For the `VITE_SPREADSHEET_ID`, you can get it from the spreadsheet url.
<img src="https://raw.githubusercontent.com/kiuyha/kiuyha.github.io/refs/heads/main/docs/SpreadsheetID.png">

4. You can change the static files in public folder such as favicon, banner_profile, profile_picture, loading_animation, etc.

5. Now just commit your changes, and the github action will handle the CI/CD pipeline, you can now access it using your github page link (e.g. kiuyha.github.io) or using custom domain.

## Notes
- Ensure to format the data in spreadsheet into `plain text` format. Since it will make bug when fetch the data from the spreadsheet (because the google visualization api only support `plain text`).
<img src="https://raw.githubusercontent.com/kiuyha/kiuyha.github.io/refs/heads/main/docs/EnsurePlainText.png">
- The website frame in info project only work if `X-Frame-Options` is not set to `SAMEORIGIN` or `DENY`. Also the header need to have `SameSite=None; Secure` in order to work properly.

## License
This project is released under the [MIT License](https://github.com/kiuyha/kiuyha.github.io/blob/main/LICENSE).

## END
Thank you for reading. Feel free to fork this project and modify it. If this repository benefits you please give a star. The design heavily inspired by <a href="https://reiiv.is-a.dev" target="_blank">ReiivanTheOnlyOne</a>.