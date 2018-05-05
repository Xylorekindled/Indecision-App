class IndecisionApp extends React.Component
{
    render()
    {
        const title = 'Indecision';
        const subtitle = 'Let computer choose for you...';

        return (
            <div>
                <Header title={title} subtitle={subtitle}/>
                <Action/>
                <Options/>
                <AddOption/>
            </div>
        );
    }
}

class Header extends React.Component
{
    render()
    {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.subtitle}</h2>
            </div>
        );
    }
}

class Action extends React.Component
{
    render()
    {
        return (
            <div>
                <button>What Should I do?</button>
            </div>
        );
    }
}

class Options extends React.Component
{
    render()
    {
        return (
            <div>
                <p>Options</p>
                <Option/>
            </div>
        );
    }
}

class Option extends React.Component
{
    render()
    {
        return (
            <div>
                <p>Item One</p>
                <p>Item Two</p>
            </div>
        );
    }
}

class AddOption extends React.Component
{
    render()
    {
        return (
            <div>
                <p>Add Options</p>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp/>, document.getElementById('app'));