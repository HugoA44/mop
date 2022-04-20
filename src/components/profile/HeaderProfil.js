import React from 'react'
import { Container, Image } from 'native-base'
import { styles } from '../../theme/Profil'

function HeaderProfil () {
  return (
    <Container
      style={styles.centerHeader}
      h='15%'
      w='100%'
    >
      <Image
        source={{
          uri: 'https://wallpaperaccess.com/full/317501.jpg'
        }} alt='Alternate Text' size='xl' borderRadius={100}
      />
    </Container>
  )
}

export default HeaderProfil
