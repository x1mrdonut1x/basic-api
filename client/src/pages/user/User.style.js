const styles = {
  card: {
    width: 400,
  },
  wrapper: {
    paddingTop: 100,
  },
  addProductIcon: {
    fontSize: 30,
    color: "rgba(0,0,0,0.3)",
  },
  addProductCard: {
    width: 90,
    height: 90,
    transition: 'all 0.3s',
    textAlign: 'center',
    lineHeight: '52px',
    '&:hover': {
      cursor: 'pointer',
      border: `1px solid #45acea`,
      boxShadow: '0px 0px 16px -5px rgba(0,0,0,0.1)'
    }
  }
}

export default styles;