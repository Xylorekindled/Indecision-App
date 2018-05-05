class IndecisionApp extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);

        this.state = {
            options: props.options
        };
    }

    handleDeleteOptions()
    {
        this.setState(() => {
            return {
                options: []
            };
        });
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

        this.setState((prevState) => {
            return {
                options: prevState.options.concat(option)
            };
        });
    }

    render()
    {
        const subtitle = 'Let computer choose for you...';

        return (
            <div>
                <Header subtitle={subtitle}/>
                <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick}/>
                <Options options={this.state.options} handleDeleteOptions={this.handleDeleteOptions}/>
                <AddOption handleAddOption={this.handleAddOption}/>
            </div>
        );
    }
}

IndecisionApp.defaultProps = {
    options: []
};

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
            {
                props.options.map((option) => {
                    return <Option key={option} optionText={option}/>
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
            <p>{props.optionText}</p>
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
        
        this.setState(() => {
            return {
                error: error
            };
        });

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