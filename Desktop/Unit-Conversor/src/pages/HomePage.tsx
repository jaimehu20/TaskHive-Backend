import React, { useState } from "react"
import { Navbar } from "../components/Navbar/Navbar"
import { ConversorBox } from "../components/ConversorBox/ConversorBox"
import { FavoriteBox } from "../components/FavoriteConversions/FavoriteBox"
import { Footer } from "../components/Footer/Footer"

export const HomePage : React.FC = () => {

    const [ myConversions, setMyConversions ] = useState<any>([]);

    return <>
        <Navbar />
        <main>
            <ConversorBox myConversions={myConversions} setMyConversions={setMyConversions}/>
            <FavoriteBox myConversions={myConversions} setMyConversions={setMyConversions} />
        </main>
        <Footer />
    </>
}