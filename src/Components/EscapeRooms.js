import React from 'react'

const EscapeRooms = ({rooms}) => {
    return (
        <ul>
            {
            rooms.map( rooms => {
							return(
								<li key={rooms.id}>
									{rooms.name}
									{rooms.briefdescription}
								</li>
							)
						})
            }
        </ul>
    )
}

 export default EscapeRooms;