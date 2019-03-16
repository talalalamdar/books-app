import React from 'react'

class EmptyStatePage extends React.Component  {

    render() {

        return (
            <diV style={{marginTop: '50px', fontSize: '40px'}}>
                <p>{this.props.message}</p>
            </diV>
        )
    }
}

export default EmptyStatePage