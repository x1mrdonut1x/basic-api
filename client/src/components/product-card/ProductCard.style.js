const styles = {
  card: {
    height: 90,
    width: 90,
  },
  hover: {
    extend: 'card',
    transition: 'all 0.3s',
    textAlign: 'center',
    '&:hover': {
      cursor: 'pointer',
      border: `1px solid #45acea`,
      boxShadow: '0px 0px 16px -5px rgba(0,0,0,0.1)'
    }
  }
}

export default styles;