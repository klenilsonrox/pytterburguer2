
import "./globals.css";
import Footer from "../../components/Footer";
import { DadosProvider } from "../../components/DadosProvider";


export const metadata = {
  title:"Pytter Burguer",
  description:"A melhor Hamburgueria em Bambuí, melhor sanduíche de bambuí, melhor porção de bambuí, melhor hambúrguer de bambuí"
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="!scroll-smooth" >
    <link rel="icon" type="image/x-icon" href="https://cdn.icon-icons.com/icons2/1874/PNG/96/iconfinder-hamburgerfastfoodfastfoodburgerfoodbread-4306476_119931.png"/>
      <body>
<DadosProvider>

{children}
</DadosProvider>
<Footer />
      </body>
      
    </html>
  );
}
