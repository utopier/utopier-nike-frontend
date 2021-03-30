import React,{Component} from 'react'

interface IErrorBoundariesState {
    hasError: boolean;
    error: Error | null
  }


  class ErrorBoundaries extends Component<any, IErrorBoundariesState> {
    state = {hasError: false, error: null};
  
    getDerivedStateFromError(error: Error) {
      return {hasError: true, error};
    }
  
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
      // 서버로 로그 전송
    }
  
    render() {
      const {hasError, error} = this.state;
  
      if (!hasError) {
        return this.props.children;
      }
  
      return (
        <div style={{flex: 1, backgroundColor: 'black'}}>
          <span style={{marginTop: 60, fontWeight: 'bold', color: 'white', fontSize: 24}}>에러 발생</span>
          <span style={{marginTop: 16, fontSize: 14, color: 'white'}}>{error + ''}</span>
        </div>
      );
    }
  }
  
  

export default ErrorBoundaries;