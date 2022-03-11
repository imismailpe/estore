
export const fetchData = async (url) => {
    const result = await fetch(url);
    const resp = await result.json();
    return resp.data;
}
export const submitProduct = async (productdata) => {
    const result = await fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productdata)
    });
    return result;
}
export const submitCategory = async (categorydata) => {
    const result = await fetch('/api/categories', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(categorydata)
    });
    return result;
}
export const submitProductUpdate = async (productdata) => {
    const result = await fetch('/api/products', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productdata)
    });
    return result;
}
export const submitProductDeletion = async (productdata) => {
    const result = await fetch('/api/products', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productdata)
    });
    return result;
}
export const submitCategoryDeletion = async (data) => {
    const result = await fetch('/api/categories', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return result;
}