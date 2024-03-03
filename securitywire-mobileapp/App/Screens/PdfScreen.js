import * as React from 'react'
import { View } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'
import Screen from '../Components/Screen'

export default PdfScreen =({route,navigation})=> {
    const { uri } = route.params;
        return (
            <Screen>
                <PDFReader
                source={{
                uri: uri
                }}
                />
            </Screen>
        )
}