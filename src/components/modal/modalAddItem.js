import React from "react"
import Drawer from 'react-drag-drawer'

export default ({
    statusMoneyCard,
}) => {
    return (
        <Drawer
            open={statusMoneyCard}
        // onRequestClose={() => handleSelectMoneyCard(false)}
        >
            <div className="modal-money-card-style">
                <div>Hey Im inside the drawer!</div>
            </div>
        </Drawer>
    );
};
