type Props = {
    onConnect: () => void
    onDismiss: () => void
}

export default function GoogleCalendarModal({ onConnect, onDismiss} : Props){
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Connect Google Calendar</h3>
                <p>Sync events you add here directly to your Google Calendar.</p>
                <div className="modal-actions">
                    <button className="modal-dismiss" onClick={onDismiss}>Not now</button>
                    <button className="modal-connect" onClick={onConnect}>Connect</button>
                </div>
            </div>
        </div>
    )
}