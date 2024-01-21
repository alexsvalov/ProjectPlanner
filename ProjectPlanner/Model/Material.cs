using System;
using System.Collections.Generic;

namespace ProjectPlanner.Model;

/// <summary>
/// Материал
/// </summary>
public partial class Material
{
    /// <summary>
    /// Код
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Наименование
    /// </summary>
    public string Name { get; set; } = null!;

    /// <summary>
    /// Размер материала
    /// </summary>
    public string? SizeStr { get; set; }

    /// <summary>
    /// Длина материала
    /// </summary>
    public int? LenghtNum { get; set; }

    /// <summary>
    /// Тип материала
    /// </summary>
    public long TypeId { get; set; }

    /// <summary>
    /// Марка стали
    /// </summary>
    public long MarkSteelId { get; set; }

    /// <summary>
    /// Группа материала
    /// </summary>
    public long GroupId { get; set; }

    /// <summary>
    /// Цена с НДС за 1 т
    /// </summary>
    public decimal PriceNum { get; set; }

    public bool? IsActive { get; set; }

    public virtual MaterialGroupDict Group { get; set; } = null!;

    public virtual MarkSteelDict MarkSteel { get; set; } = null!;

    public virtual ICollection<MaterialPrice> MaterialPrices { get; set; } = new List<MaterialPrice>();

    public virtual ICollection<ProductDetail> ProductDetails { get; set; } = new List<ProductDetail>();

    public virtual MaterialTypeDict Type { get; set; } = null!;
}
