import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const DefaultCard = (props) => {
    const {text, onPress} = props

    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardContent}>

                <View style={styles.cardText}>
                    <Text style={styles.title}>Title</Text>
                    <Text style={styles.paragraph}>Description</Text>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {

    },
    cardContent: {

    },
    title: {

    },
    paragraph: {

    },
});

export default DefaultCard
