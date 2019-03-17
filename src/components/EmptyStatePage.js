import React from 'react'

class EmptyStatePage extends React.Component {

    render() {

        return (
            <div style={{ marginTop: '50px', fontSize: '40px', color: 'white' }}>
                <p>{this.props.message}</p>
            </div>
        )
    }
}

export default EmptyStatePage