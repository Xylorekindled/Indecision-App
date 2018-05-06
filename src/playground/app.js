class IndecisionApp extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteSingleOption = this.handleDeleteSingleOption.bind(this);

        this.state = {
            options: []
        };
    }

    componentWillMount()
    {
        try
        {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if(options)
            {
                this.setState(() => ({
                    options
                }));
            }
        }
        catch(e)
        {
            // Do Nothing....
        }
    }

    componentDidUpdate(prevProps, prevState)
    {
        if(prevState.options.length !== this.state.options.length)
        {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    handleDeleteOptions()
    {
        this.setState(() => ({
            options: []
        }));
    }

    handleDeleteSingleOption(optionToRemove)
    {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
    }

    handlePick()
    {
        const rand = Math.floor(Math.random() * this.state.options.length);
        const opt = this.state.options[rand]
        alert(opt);
    }

    handleAddOption(option)
    {
        if(!option) return 'Enter valid value to add item';
        else if(this.state.options.indexOf(option) > -1) return 'This option already exists';

        this.setState((prevState) => ({
            options: prevState.options.concat(option)
        }))
    }

    render()
    {
        const subtitle = 'Let computer choose for you...';

        return (
            <div>
                <Header subtitle={subtitle}/>
                <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick}/>
                <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions} handleDeleteSingleOption={this.handleDeleteSingleOption}/>
                <AddOption handleAddOption={this.handleAddOption}/>
            </div>
        );
    }
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
};

Header.defaultProps = {
    title: 'Indecision'
};

/*
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
*/

const Action = (props) => {
    return (
        <div>
            <button disabled={!props.hasOptions} onClick={props.handlePick}>What Should I do?</button>
        </div>
    );
};

/*
class Action extends React.Component
{
    render()
    {
        return (
            <div>
                <button disabled={!this.props.hasOptions} onClick={this.props.handlePick}>What Should I do?</button>
            </div>
        );
    }
}
*/

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {props.options.length === 0 && <p>Please add and option to get started!</p>}
            {
                props.options.map((option) => {
                    return <Option key={option} optionText={option} handleDeleteSingleOption={props.handleDeleteSingleOption}/>
                })
            }
        </div>
    );
};

/*
class Options extends React.Component
{
    render()
    {
        return (
            <div>
                <button onClick={this.props.handleDeleteOptions}>Remove All</button>
                {
                    this.props.options.map((option) => {
                        return <Option key={option} optionText={option}/>
                    })
                }
            </div>
        );
    }
}
*/

const Option = (props) => {
    return (
        <div>
            {props.optionText}
            <button onClick={(e) => { props.handleDeleteSingleOption(props.optionText) }}>remove</button>
        </div>
    );
};

/*
class Option extends React.Component
{
    render()
    {
        return (
            <div>
                <p>{this.props.optionText}</p>
            </div>
        );
    }
}
*/

class AddOption extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);

        this.state = {
            error: undefined
        };
    }

    handleAddOption(e)
    {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        
        this.setState(() => ({
            error: error
        }));

        e.target.elements.option.value = '';
    }

    render()
    {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<IndecisionApp options={['Backstreet Boys', 'NKOTB']}/>, document.getElementById('app'));