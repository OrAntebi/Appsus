export function EmptyTabMsg({ tabName }) {
    return (
        <section className="empty-tab-msg-container flex column align-center justify-center">
                <img src={`assets/img/note/${tabName}.svg`} alt="Trash" />
            <h1>{tabName} is empty</h1>
        </section>
    )
}
